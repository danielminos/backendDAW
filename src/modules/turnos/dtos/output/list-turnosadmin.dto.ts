import { ApiProperty } from "@nestjs/swagger";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";

export class ListTurnosAdminDTO {

    @ApiProperty()
    idTurno: number;

    @ApiProperty()
    fechaHora: Date;

    @ApiProperty({ enum: EstadosReservas })
    estado: EstadosReservas;

    @ApiProperty({ description: 'Valor de la consulta congelado al reservar el turno' })
    valorConsulta: number;

    @ApiProperty()
    idPaciente: number;

    @ApiProperty()
    documentoPaciente: string;

    @ApiProperty()
    apellidoPaciente: string;

    @ApiProperty()
    nombrePaciente: string;

    @ApiProperty()
    idMedico: number;

    @ApiProperty()
    apellidoMedico: string;

    @ApiProperty()
    nombreMedico: string;
}