import { Body, Controller, Get, ParseIntPipe, Req, NotImplementedException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { IdResponseDTO } from "../dtos/output/id-response.dto.js";
import { CreateTurnoDTO } from "../dtos/input/create-turno.dto.js";
import { ListTurnosAdminDTO } from "../dtos/output/list-turnosadmin.dto.js";
import { UpdateValorConsultaDTO } from "../dtos/input/update-valor-consulta.dto.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";
import { TurnosServices } from "../services/turnos.services.js";
import { MedicosServices } from "../services/medicos.services.js";
import { Reserva } from "../entities/reserva.entity.js";
import { RolesGuard } from "../../auth/guards/roles.guard.js";
import { Roles } from "../../auth/decorators/roles.decorator.js";
import { RolesUsuarios } from "../../auth/enums/rolesusuarios.enum.js";
import { Usuario } from "../../auth/entities/usuario.entity.js";
import { UsuariosService } from "../../auth/services/usuarios.services.js";
import { ListPacientesDTO } from "../dtos/output/list-pacientes.dto.js";

@Controller('/administrador')
export class AdministradorController {

    constructor(private readonly turnosService: TurnosServices,
        private readonly medicoService: MedicosServices,
        private readonly usuariosService: UsuariosService
    ) { }

    // Listar pacientes activos
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.ADMINISTRADOR)
    @ApiOkResponse({ type: ListPacientesDTO, isArray: true })
    @Get('/pacientes')
    async listarPacientes(): Promise<ListPacientesDTO[]> {
        const pacientes = await this.usuariosService.listarPacientesActivos();

        return pacientes.map((p: Usuario) => ({
            idPaciente: p.id,
            documento: p.documento,
            apellido: p.apellidos,
            nombre: p.nombres,
        }));
    }

    // Reservar turno
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.ADMINISTRADOR)
    @ApiCreatedResponse({ type: IdResponseDTO })
    @Post('/turnos')
    async reservarTurno(@Body() dto: CreateTurnoDTO): Promise<{ id: number }> {
        const { id } = await this.turnosService.crearReserva(dto);
        return { id };
    }

    // Cancelar un turno
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.ADMINISTRADOR)
    @Put(':id/cancelar')
    async cancelarTurno(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<void> {
        await this.turnosService.cancelarReserva(id, req.user);
    }

    // Listar todos los turnos
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.ADMINISTRADOR)
    @ApiOkResponse({ type: ListTurnosAdminDTO, isArray: true })
    @Get('/turnos')
    async listarturnos(): Promise<ListTurnosAdminDTO[]> {
        const reservas = await this.turnosService.listarTodasLasReservas();
        
        return reservas.map((r: Reserva) => ({
            idTurno: r.id,
            fechaHora: r.fechaHora,
            estado: r.estado,
            valorConsulta: r.valorConsulta,
            idPaciente: r.idPaciente,
            documentoPaciente: r.paciente?.documento ?? '',
            apellidoPaciente: r.paciente?.apellidos ?? '',
            nombrePaciente: r.paciente?.nombres ?? '',
            idMedico: r.idMedico,
            apellidoMedico: r.medico?.usuario?.apellidos ?? '',
            nombreMedico: r.medico?.usuario?.nombres ?? ''
        }))
    }

    // Modificar el valor de una consulta
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.ADMINISTRADOR)
    @Put('/medicos/:idMedico/valor')
    async cambiarValorConsulta(
        @Param('idMedico') idMedico: number,
        @Body() dto: UpdateValorConsultaDTO
    ): Promise<void> {
        await this.medicoService.modificarValorConsulta(idMedico, dto.valorConsulta);
        return;
    }
}