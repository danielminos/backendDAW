import { SetMetadata } from "@nestjs/common";
import { RolesUsuarios } from "../enums/rolesusuarios.enum.js";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesUsuarios[]) => SetMetadata(ROLES_KEY, roles);