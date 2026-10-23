import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { ListPacientesMedicoDTO } from "../dtos/output/list-pacientesmedico.dto.js";
import { UpdateTurnoDTO } from "../dtos/input/update-turno.dto.js";
import { MedicosServices } from "../services/medicos.services.js";
import { Reserva } from "../entities/reserva.entity.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";
import { RolesGuard } from "../../auth/guards/roles.guard.js";
import { Roles } from "../../auth/decorators/roles.decorator.js";
import { RolesUsuarios } from "../../auth/enums/rolesusuarios.enum.js";

@Controller('/medicos')
export class MedicosController {

    constructor(private readonly service: MedicosServices) { }

    // Listar turnos del médico
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.MEDICO)
    @ApiQuery({ name: 'fecha', type: 'string', required: false })
    @ApiOkResponse({ type: ListPacientesMedicoDTO, isArray: true })
    @Get('/turnos')
    async listarTurnosMedico(
        @Req() req: any,
        @Query('fecha') fecha?: string,
    ): Promise<ListPacientesMedicoDTO[]> {

        const idUsuarioLogueado = req.user.id;

        // Buscamos el médico según usuario logueado
        const medico = await this.service.obtenerMedicoPorIdUsuario(idUsuarioLogueado);

        const fechaFiltro = fecha ? new Date(fecha) : undefined;
        
        // La fecha se pasa como string
        const reservas = await this.service.listarReservasMedico(medico.id, fecha);

        return reservas.map((r: Reserva) => ({
            idTurno: r.id,
            idPaciente: r.idPaciente,
            documento: r.paciente.documento ?? '',
            nombre: r.paciente.nombres ?? '',
            apellido: r.paciente.apellidos ?? '',
            fechaHora: r.fechaHora ?? '',
            estado: r.estado ?? ''
        }));
    }

    // Cambiar estado del turno
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.MEDICO)
    @Patch(':id/estado')
    
    async cambiarEstadoTurno(
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto: UpdateTurnoDTO,
        @Req() req: any
    ): Promise<void> {
        //El id del médico se obtiene del usuario logueado
        await this.service.cambiarEstadoReserva(id, dto.estado, req.user.id);
    }
}