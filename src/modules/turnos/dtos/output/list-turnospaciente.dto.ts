import {ApiProperty } from "@nestjs/swagger";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";

export class ListTurnosPacienteDTO {

    @ApiProperty()
    idTurno: number;

    @ApiProperty()
    fechaHora: Date;

    @ApiProperty({ enum: EstadosReservas })
    estado: EstadosReservas;

    @ApiProperty({ description: 'Valor de la consulta congelado al reservar el turno' })
    valorConsulta: number;

    @ApiProperty()
    apellidoMedico: string;

    @ApiProperty()
    nombreMedico: string;

}

