import { ApiProperty } from "@nestjs/swagger";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";

export class ListTurnosPacienteDTO {
    @ApiProperty()
    idTurno: number;

    @ApiProperty()
    fechaHora: Date;

    @ApiProperty()
    estado: EstadosReservas;

    @ApiProperty()
    apellidoMedico: string;

    @ApiProperty()
    nombreMedico: string;
}
