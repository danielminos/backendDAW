import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsString } from "class-validator";

export class LoginDTO {

    @ApiProperty()
    @IsEmail({}, { message: 'El email debe ser una direccion de correo valida' })
    @IsNotEmpty({ message: 'El email de usuario es requerido' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'La clave debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La clave es requerida' })
    @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres' })
    @MaxLength(32, { message: 'La clave debe tener menos de 32 caracteres' })
    clave: string;
}