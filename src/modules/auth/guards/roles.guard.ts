import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator.js";
import { RolesUsuarios } from "../enums/rolesusuarios.enum.js";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        
        //Obtener roles definidos en el decorador Roles
        const requiredRoles = this.reflector.getAllAndOverride<RolesUsuarios[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        // AuthGuard guarda el usuario del token en request.user
        const { user } = context.switchToHttp().getRequest();
        
        const hasRole = requiredRoles.some((role) => user?.rol === role);
        
        if (!hasRole) {
            throw new ForbiddenException('No tienes permiso para acceder');
        }

        return true;
    }
}