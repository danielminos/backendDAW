import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator.js";
import { RolesUsuarios } from "../enums/rolesusuarios.enum.js";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Obtener los roles definidos en el decorador @Roles
        const requiredRoles = this.reflector.getAllAndOverride<RolesUsuarios[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        //const request = context.switchToHttp().getRequest();
        //const user = request.user;
        const { user } = context.switchToHttp().getRequest();

        const hasRole = requiredRoles.some((role) => user.role === role);

        if (!hasRole) {
            throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
        }

        return true;
    }
}