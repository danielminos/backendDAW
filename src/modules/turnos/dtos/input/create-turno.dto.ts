import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsDate } from "class-validator";

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
    @IsDate()
    @IsNotEmpty({ message: 'La fecha es requerida' })
    fechaHora: Date;
}

