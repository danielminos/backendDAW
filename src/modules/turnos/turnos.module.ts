import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity.js';
import { Reserva } from './entities/reserva.entity.js';
import { AdministradorController } from './controllers/administrador.controller.js';
import { MedicosController } from './controllers/medicos.controller.js';
import { PacientesController } from './controllers/pacientes.controller.js';
import { Usuario } from '../auth/entities/usuario.entity.js';
import { TurnosServices } from './services/turnos.services.js';
import { MedicosServices } from './services/medicos.services.js';
import { AuthModule } from '../auth/auth.module.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@Module({
    imports: [TypeOrmModule.forFeature([Medico, Reserva, Usuario]), AuthModule],
    controllers: [AdministradorController, MedicosController, PacientesController],
    providers: [TurnosServices, MedicosServices],
    exports: [TypeOrmModule, TurnosServices, MedicosServices],
})

export class TurnosModule { }