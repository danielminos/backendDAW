import { OmitType } from "@nestjs/swagger";
import { CreateTurnoDTO } from "./create-turno.dto.js";

// Se toma el ID del paciente desde el token
export class CreateTurnoPacienteDTO extends OmitType(CreateTurnoDTO, ['idPaciente'] as const) { }

