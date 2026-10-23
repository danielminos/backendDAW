import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // <--- Aquí es donde llega undefined si no pasó por una estrategia JWT previa

        // Validación defensiva para evitar que explote si el usuario no está autenticado
        if (!user) {
            return false;
        }

        // Asegúrate de que coincida con el nombre de la propiedad en tu token (ej: 'role' o 'rol')
        return requiredRoles.some((role) => user.role === role || user.rol === role);
    }
}