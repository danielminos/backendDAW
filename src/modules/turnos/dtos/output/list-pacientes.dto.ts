import { ApiProperty } from "@nestjs/swagger";

export class ListPacientesDTO {
    @ApiProperty({ description: 'ID del paciente' })
    idPaciente: number;

    @ApiProperty()
    documento: string;

    @ApiProperty()
    apellido: string;

    @ApiProperty()
    nombre: string;
}