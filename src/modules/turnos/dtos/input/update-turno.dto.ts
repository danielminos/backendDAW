import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";
import { EstadosReservas } from "../../enums/estadosreservas.enum.js";
import { CreateTurnoDTO } from "./create-turno.dto.js";

export class UpdateTurnoDTO extends CreateTurnoDTO {
    @ApiProperty({ enum: EstadosReservas })
    @IsEnum(EstadosReservas, { message: 'El estado es invalido' })
    @IsNotEmpty({ message: 'El estado es requerido' })
    estado: EstadosReservas;

}
