import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
   
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message : 'El nombre de usuario es requerido'})
    nombre : string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message : 'La clave es requerida'})
    clave : string;
}