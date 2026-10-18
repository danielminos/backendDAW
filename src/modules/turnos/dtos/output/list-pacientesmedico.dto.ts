import { ApiProperty } from "@nestjs/swagger";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";

export class ListPacientesMedicoDTO {
    @ApiProperty()
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
