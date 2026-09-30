import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
//import { Usuario } from "../../auth/entities/usuario.entity.js";
// import { Reserva } from "./reserva.entity.js";

@Entity('medicos')
export class Medico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario' })
    idUsuario: number;

    @OneToOne('Usuario', (usuario:any) => usuario.medico, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' })
    usuario: any;

    @Column({ type: 'int' })
    matricula: number;

    @Column({ name: 'valor_consulta', type: 'int' })
    valorConsulta: number;

    @OneToMany('Reserva', (reserva:any) => reserva.medico)
    reservas: any[];
}