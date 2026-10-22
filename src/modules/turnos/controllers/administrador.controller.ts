import { Body, Controller, Get, ParseIntPipe, Req, NotImplementedException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateTurnoDTO } from "../dtos/input/create-turno.dto.js";
import { ListPacientesMedicoDTO } from "../dtos/output/list-pacientesmedico.dto.js";
import { UpdateValorConsultaDTO } from "../dtos/input/update-valor-consulta.dto.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";
import { TurnosServices } from "../services/turnos.services.js";
import { MedicosServices } from "../services/medicos.services.js";
import { Reserva } from "../entities/reserva.entity.js";
import { RolesGuard } from "../../auth/guards/roles.guard.js";
import { Roles } from "../../auth/decorators/roles.decorator.js";
import { RolesUsuarios } from "../../auth/enums/rolesusuarios.enum.js";

@Controller('/administrador')
export class AdministradorController {

    constructor(private readonly turnosService: TurnosServices,
        private readonly medicoService: MedicosServices
    ) { }

    // Reservar turno
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.ADMINISTRADOR)
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
    @ApiOkResponse({ type: ListPacientesMedicoDTO, isArray: true })
    @Get('/turnos')
    async listarTurnos(): Promise<any[]> {
        const reservas = await this.turnosService.listarTodasLasReservas();
        return reservas.map((r: Reserva) => ({
            idTurno: r.id,
            idPaciente: r.idPaciente,
            idMedico: r.idMedico,
            fechaHora: r.fechaHora,
            estado: r.estado,
            valorConsulta: r.valorConsulta
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