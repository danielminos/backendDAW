import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, Matches } from "class-validator"

export class ListTurnosMedicoQueryDTO {
    @ApiPropertyOptional({ example: '2026-10-28', description: 'Día a consultar, formato AAAA-MM-DD. Si se omite, devuelve todos los turnos' })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener el formato AAAA-MM-DD' })
    fecha?: string;
}