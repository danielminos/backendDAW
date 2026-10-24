import { ApiProperty } from "@nestjs/swagger";


export class ListMedicosDTO {
    @ApiProperty({ description: 'ID del médico' })
    idMedico: number;

    @ApiProperty()
    apellido: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    matricula: number;

    @ApiProperty({ description: 'Valor de la consulta' })
    valorConsulta: number;
}

