import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity.js";
import { EstadosUsuarios } from "../enums/estadosusuarios.enum.js";
import { RolesUsuarios } from "../enums/rolesusuarios.enum.js";

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

    // Un paciente valido es un usuario existente, con rol paciente y estado activo
    async buscarPacienteActivoPorId(id: number): Promise<Usuario | null> {
        return await this.repository.findOne({
            where: {
                id,
                rol: RolesUsuarios.PACIENTE,
                estado: EstadosUsuarios.ACTIVO
            }
        })
    }

    //Pacientes activos, ordenados por apellido
    async listarPacientesActivos(): Promise<Usuario[]> {
        return await this.repository.find({
            where: {
                rol: RolesUsuarios.PACIENTE,
                estado: EstadosUsuarios.ACTIVO
            },
            order: { apellidos: 'ASC' }
        })
    }
}