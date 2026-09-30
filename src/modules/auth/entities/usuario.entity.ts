import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { EstadosUsuarios } from "../enums/estadosusuarios.enum.js";
import { RolesUsuarios } from "../enums/rolesusuarios.enum.js";
//import { Medico } from "../../turnos/entities/medico.entity.js";
//import { Reserva } from "../../turnos/entities/reserva.entity.js";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    documento: string;

    @Column({ type: 'text' })
    apellidos: string;

    @Column({ type: 'text' })
    nombres: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    clave: string;

    @Column({
        type: 'enum',
        enum: EstadosUsuarios,
    })
    estado: EstadosUsuarios;

    @Column({
        type: 'enum',
        enum: RolesUsuarios,
    })
    rol: RolesUsuarios;

    //Relaciones
    @OneToOne('Medico', (medico: any) => medico.usuario)
    medico: any;

    @OneToMany('Reserva', (reserva: any) => reserva.paciente)
    reservas: any[];
} 