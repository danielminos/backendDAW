import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateTurnoDTO } from "../dtos/input/create-turno.dto.js";
import { ListTurnosPacienteDTO } from "../dtos/output/list-turnospaciente.dto.js";
import { TurnosServices } from "../services/turnos.services.js";
import { Reserva } from "../entities/reserva.entity.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";
import { Roles } from "../../auth/decorators/roles.decorator.js";
import { RolesGuard } from "../../auth/guards/roles.guard.js";
import { RolesUsuarios } from "../../auth/enums/rolesusuarios.enum.js";

@Controller('/pacientes')
export class PacientesController {

    constructor(private readonly service: TurnosServices) { }

    // Crear un turno al paciente
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.PACIENTE)
    @Post('/turnos')
    async crearTurno(@Body() req: any, @Body() dto: CreateTurnoDTO): Promise<{ id: number }> {
        //idPaciente sea el del usuario logueado en el token JWT
        dto.idPaciente = req.user.id;

        const { id } = await this.service.crearReserva(dto)
        return { id };
    }

    // Obtener los turnos del paciente
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.PACIENTE)
    @ApiOkResponse({ type: ListTurnosPacienteDTO, isArray: true })
    @Get('/turnos')
    async listarTurnosPaciente(@Req() req: any): Promise<ListTurnosPacienteDTO[]> {
        const idPaciente = req.user.id;
        const reservas = await this.service.listarReservasPaciente(idPaciente);
        return reservas.map((r: Reserva) => ({
            idTurno: r.id,
            fechaHora: r.fechaHora,
            estado: r.estado,
            apellidoMedico: r.medico?.usuario?.apellidos ?? '',
            nombreMedico: r.medico?.usuario?.nombres ?? ''
        }))
    }

    // Cancelar un turno
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.PACIENTE)
    @Put(':id/cancelar')
    async cancelarTurno(@Param('id') id: number): Promise<void> {
        await this.service.cancelarReserva(id);
        return;
    }
}