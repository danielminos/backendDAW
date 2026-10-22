import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
    @ApiProperty({ description: 'Token de acceso JWT que se envia en el header Authorization' })
    accessToken: string;
}