import { ApiProperty } from "@nestjs/swagger";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";

export class ListPacientesMedicoDTO {
    @ApiProperty({ description: 'La ID del turno sirve para identificarlo y marcarlo como atendido o cancelarlo' })
    idTurno: number;
    idPaciente: number;

    @ApiProperty()
    documento: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    apellido: string;

    @ApiProperty()
    fechaHora: Date;

    @ApiProperty()
    estado: EstadosReservas;

}
