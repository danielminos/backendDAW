import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { ListPacientesMedicoDTO } from "../dtos/output/list-pacientesmedico.dto.js";
import { UpdateTurnoDTO } from "../dtos/input/update-turno.dto.js";
import { MedicosServices } from "../services/medicos.services.js";
import { Reserva } from "../entities/reserva.entity.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";
import { RolesGuard } from "../../auth/guards/roles.guard.js";
import { Roles } from "../../auth/decorators/roles.decorator.js";
import { RolesUsuarios } from "../../auth/enums/rolesusuarios.enum.js";
import { Medico } from "../entities/medico.entity.js";
import { ListMedicosDTO } from "../dtos/output/list-medicos.dto.js";
import { ListTurnosMedicoQueryDTO } from "../dtos/input/list-turnos-medico-query.dto.js"

@Controller('/medicos')
export class MedicosController {

    constructor(private readonly service: MedicosServices) { }

    // Listar médicos activos (lo usan paciente y admin para elegir turno)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.PACIENTE, RolesUsuarios.ADMINISTRADOR)
    @ApiOkResponse({ type: ListMedicosDTO, isArray: true })
    @Get()
    async listarMedicos(): Promise<ListMedicosDTO[]> {
        const medicos = await this.service.listarMedicos();

        return medicos.map((m: Medico) => ({
            idMedico: m.id,
            apellido: m.usuario?.apellidos ?? '',
            nombre: m.usuario?.nombres ?? '',
            matricula: m.matricula,
            valorConsulta: m.valorConsulta
        }));
    }

    // Listar turnos del médico
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesUsuarios.MEDICO)
    @ApiOkResponse({ type: ListPacientesMedicoDTO, isArray: true })
    @Get('/turnos')
    async listarTurnosMedico(
        @Req() req: any,
        @Query() query: ListTurnosMedicoQueryDTO,
    ): Promise<ListPacientesMedicoDTO[]> {

        const idUsuarioLogueado = req.user.id;

        // Buscamos el médico según usuario logueado
        const medico = await this.service.obtenerMedicoPorIdUsuario(idUsuarioLogueado);
      
        // La fecha se pasa como string
        const reservas = await this.service.listarReservasMedico(medico.id, query.fecha);

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