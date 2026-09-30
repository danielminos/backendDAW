import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { EstadosReservas } from "../enums/estadosreservas.enum.js";
//import { Medico } from "../entities/medico.entity.js";
//import { Usuario } from "../../auth/entities/usuario.entity.js";

@Entity('reservas')
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_medico' })
    idMedico: number;

    @ManyToOne('Medico', (medico: any) => medico.reservas, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'id_medico' })
    medico: any;

    @Column({ name: 'id_paciente' })
    idPaciente: number;

    @ManyToOne('Usuario', (usuario: any) => usuario.reservas, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'id_paciente' })
    paciente: any;

    @Column({ name: 'fecha_hora', type: 'timestamp' })
    fechaHora: Date;

    @Column({
        type: 'enum',
        enum: EstadosReservas,
    })
    estado: EstadosReservas;
    
    @Column({ name: 'valor_consulta', type: 'int'})
    valorConsulta: number;

}