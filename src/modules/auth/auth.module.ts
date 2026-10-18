import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './controllers/login.controller.js';
import { Usuario } from './entities/usuario.entity.js';
import { UsuariosService } from './services/usuarios.services.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthServices } from './services/auth.services.js';
import { AuthGuard } from './guards/auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '8h' }
            })
        })
    ],
    controllers: [LoginController],
    providers: [UsuariosService, AuthServices, AuthGuard, RolesGuard],
    exports: [TypeOrmModule, UsuariosService, JwtModule, AuthGuard, RolesGuard, AuthServices]
})

export class AuthModule { }