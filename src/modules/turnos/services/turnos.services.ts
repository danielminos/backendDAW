import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RolesUsuarios } from "../../auth/enums/rolesusuarios.enum.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Reserva } from "../entities/reserva.entity.js";
import { Medico } from "../entities/medico.entity.js";
import { Repository } from "typeorm";
import { CreateTurnoDTO } from "../dtos/input/create-turno.dto.js";
import { EstadosReservas } from "../enums/estadosreservas.enum.js";

@Injectable()
export class TurnosServices {

    constructor(@InjectRepository(Reserva) private readonly reservaRepository: Repository<Reserva>,
        @InjectRepository(Medico) private readonly medicoRepository: Repository<Medico>) { }

    // Crear reserva
    async crearReserva(dto: CreateTurnoDTO): Promise<{ id: number }> {
        const fechaReserva = new Date(dto.fechaHora)
        const ahora = new Date();

        // Validar anticipacion 30 días
        const treintaDiasDespues = new Date();
        treintaDiasDespues.setDate(ahora.getDate() + 30);

        if (fechaReserva > treintaDiasDespues || fechaReserva < ahora) {
            throw new BadRequestException("Los turnos se pueden reserva con un máximo de 30 días de anticipación y no en fechas pasadas");
        }

        // Validar horario de atención (8 a 16) y duración de 1 hora
        const hora = fechaReserva.getHours();
        const minutos = fechaReserva.getMinutes();

        if (hora < 8 || hora >= 16 || minutos !== 0) {
            throw new BadRequestException("El horario de atención es de 8 a 16");
        }

        // Verificar que el médico exista y obtener su valor de consulta actual
        const medico = await this.medicoRepository.findOneBy({ id: dto.idProfesional });
        if (!medico) {
            throw new BadRequestException("Médico no encontrado");
        }

        // Verificar que el horario no esté ocupado para ése médico
        const turnoOcupado = await this.reservaRepository.findOne({
            where: {
                idMedico: dto.idProfesional,
                fechaHora: fechaReserva,
                estado: EstadosReservas.ACTIVO
            }
        });

        if (turnoOcupado) {
            throw new BadRequestException("Horario ocupado");
        }

        // Crear reserva
        const nuevaReserva = this.reservaRepository.create({
            idPaciente: dto.idPaciente,
            idMedico: dto.idProfesional,
            fechaHora: fechaReserva,
            estado: EstadosReservas.ACTIVO,
            valorConsulta: medico.valorConsulta
        });

        await this.reservaRepository.save(nuevaReserva);

        return { id: nuevaReserva.id }

    }

    // Cancelar Reserva: Pacientes (Sus propios turnos y hasta un día antes), Administradores (Cualquier turno)
    async cancelarReserva(id: number, usuario: { id: number, rol: RolesUsuarios }): Promise<void> {

        const reserva: Reserva | null = await this.reservaRepository.findOneBy({ id });

        if (!reserva) throw new NotFoundException("Reserva no encontrada");

        if (usuario.rol === RolesUsuarios.PACIENTE && reserva.idPaciente !== usuario.id) {
            throw new ForbiddenException("No podés cancelar un turno que no es tuyo.");
        }

        if (reserva.estado !== EstadosReservas.ACTIVO) {
            throw new BadRequestException("El turno no está activo y no se puede cancelar.");
        }

        const ahora = new Date();

        if (usuario.rol === RolesUsuarios.PACIENTE) {
            // Las fechas se llevan a las 00:00 para ignorar la hora
            const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
            const diaConsulta = new Date(reserva.fechaHora.getFullYear(), reserva.fechaHora.getMonth(), reserva.fechaHora.getDate());

            if (hoy >= diaConsulta) {
                throw new BadRequestException("No podés cancelar un turno el mismo día o después de la fecha del turno.");
            }
        } else if (ahora >= reserva.fechaHora) {
            throw new BadRequestException("No podés cancelar un turno pasado.");
        }

        reserva.estado = EstadosReservas.CANCELADO;
        await this.reservaRepository.save(reserva);
    }

    // Listar reservas por paciente
    async listarReservasPaciente(idPaciente: number): Promise<Reserva[]> {
        const reservas = await this.reservaRepository.find({
            where: { idPaciente },
            relations: {
                medico: {
                    usuario: true,
                },
            },
        });
        return reservas;
    }

    // Listar reservas por medico
    async listarReservasMedico(idMedico: number): Promise<Reserva[]> {
        const reservas = await this.reservaRepository.findBy({ idMedico });
        return reservas;
    }

    // Listar reservas por fecha
    async listarReservasPorFecha(fechaHora: Date): Promise<Reserva[]> {
        const reservas = await this.reservaRepository.findBy({ fechaHora });
        return reservas;
    }

    // Listar todas las reservas del sistema (Exclusivo para el Administrador)
    async listarTodasLasReservas(): Promise<Reserva[]> {
        const reservas = await this.reservaRepository.find({
            relations: {
                paciente: true,
                medico: {
                    usuario: true,
                },
            },
            order: {
                fechaHora: 'DESC',
            }
        });
        return reservas;
    }
}