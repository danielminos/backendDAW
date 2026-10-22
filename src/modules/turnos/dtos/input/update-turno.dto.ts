import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";

export class UpdateTurnoDTO {
    @ApiProperty({ enum: [EstadosReservas.ATENDIDO, EstadosReservas.AUSENTE] })
    @IsIn([EstadosReservas.ATENDIDO, EstadosReservas.AUSENTE], { 
        message: 'El estado debe ser ATENDIDO o AUSENTE',
    })
    estado: EstadosReservas;
}