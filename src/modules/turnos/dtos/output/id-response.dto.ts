import { ApiProperty } from "@nestjs/swagger";

export class IdResponseDTO {
    @ApiProperty({ description: 'ID del turno creado'})
    id: number;
}

