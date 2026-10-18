import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";


export class UpdateValorConsultaDTO {
    @ApiProperty({ description: "El nuevo valor de la consulta", example: 5000 })
    @IsNumber({}, { message: 'El valor debe ser un número' })
    @IsNotEmpty({ message: 'El valor no puede estar vacío' })
    @Min(0, { message: 'El valor no puede ser negativo' })
    valorConsulta: number;
}