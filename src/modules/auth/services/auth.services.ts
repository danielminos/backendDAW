import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuariosService } from "./usuarios.services.js";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "../dtos/input/login.dto.js";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthServices {
    constructor(private readonly usuariosService: UsuariosService,
        private jwtService: JwtService) { }


    async login(dto: LoginDTO): Promise<{ accessToken: string }> {

        const usuario = await this.usuariosService.buscarUsuarioActivoPorMail(dto.email);
        if (!usuario) {
            throw new UnauthorizedException("Credenciales invalidas");
        }
        if (!bcrypt.compareSync(dto.clave, usuario.clave)) {
            throw new UnauthorizedException("Credenciales invalidas");
        }

        const payload = {
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombres,
            apellido: usuario.apellidos,
            rol: usuario.rol,
        }

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}