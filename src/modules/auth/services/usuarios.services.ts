import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity.js";
import { EstadosUsuarios } from "../enums/estadosusuarios.enum.js";

@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private readonly repository: Repository<Usuario>) { }

    async buscarUsuarioActivoPorMail(email: string): Promise<Usuario | null> {
        return await this.repository.findOne({
            where: {
                email,
                estado: EstadosUsuarios.ACTIVO
            }
        })
    }
}