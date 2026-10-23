import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reserva } from "../entities/reserva.entity.js";
import { Medico } from "../entities/medico.entity.js";
import { Between, Not, Repository } from "typeorm";
import { EstadosReservas } from "../enums/estadosreservas.enum.js";

@Injectable()
export class MedicosServices {

    constructor(@InjectRepository(Reserva) private readonly repository: Repository<Reserva>,
        @InjectRepository(Medico) private readonly medicoRepository: Repository<Medico>) { }

    // Modificar valor de consulta
    async modificarValorConsulta(idMedico: number, valorConsulta: number): Promise<{ id: number }> {
        //const medico = await this.repository.findOneBy({ id });
        const medico = await this.medicoRepository.findOneBy({ id: idMedico })
        //if (!reserva) throw new NotFoundException("");
        if (!medico) throw new NotFoundException("Medico no encontrado");

        //if (medico.estado !== EstadosReservas.ACTIVO) throw new BadRequestException("El medico no está activo")

        medico.valorConsulta = valorConsulta;
        await this.medicoRepository.save(medico)

        //await this.repository.save(reserva);
        return { id: medico.id };
    }

    // Listar reservas por medico y por fecha
    async listarReservasMedicoFecha(idMedico: number, fecha: Date): Promise<Reserva[]> {
        const reservas = await this.repository.find({
            where: { idMedico, fechaHora: fecha },
            relations: { paciente: true }
        })
        return reservas;
    }

    // Listar reservas por medico (con fecha opcional)
    async listarReservasMedico(idMedico: number, fecha?: string): Promise<Reserva[]> {
        const where: any = { idMedico };
        // los turnos cancelados no se muestran en la agenda del medico
        where.estado = Not(EstadosReservas.CANCELADO);
        
        if (fecha) {
            const [anio, mes, dia] = fecha.split('-').map(Number);
            const inicio = new Date(anio, mes - 1, dia, 0, 0, 0);
            const fin = new Date(anio, mes - 1, dia, 23, 59, 59, 999);
            where.fechaHora = Between(inicio, fin);            
        }
        
        return await this.repository.find({
            where,
            relations: { paciente: true },
            order: { fechaHora: 'ASC' }
        });
    }

    // Cambiar estado de la reserva
    async cambiarEstadoReserva(idReserva: number, estado: EstadosReservas, idUsuario: number): Promise<void> {
        const medico = await this.obtenerMedicoPorIdUsuario(idUsuario);

        const reserva = await this.repository.findOneBy({ id: idReserva });
        if (!reserva) throw new NotFoundException("Reserva no encontrada");

        if (reserva.idMedico !== medico.id) {
            throw new ForbiddenException("No podés modificar el turno de otro médico.");
        }

        if (reserva.estado !== EstadosReservas.ACTIVO) {
            throw new BadRequestException("El turno no está activo y no se puede modificar.");
        }

        reserva.estado = estado;
        await this.repository.save(reserva);
    }

    // Buscar el registro del médico a partir del id_usuario del token
    async obtenerMedicoPorIdUsuario(idUsuario: number): Promise<Medico> {
        const medico = await this.medicoRepository.findOne({
            where: { idUsuario: idUsuario } // Asegúrate de que tu entidad Medico tenga esta propiedad mapeada
        });
        if (!medico) {
            throw new NotFoundException("El usuario logueado no tiene un perfil de médico asociado.");
        }
        return medico;
    }
}