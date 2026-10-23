import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateTurnoDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'El idPaciente es requerido' })
    idPaciente: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'El idProfesional es requerido' })
    idProfesional: number;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({ message: 'La fecha es requerida' })
    fechaHora: Date;
}

