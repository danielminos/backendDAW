import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LoginDTO } from '../dtos/input/login.dto.js';
import { LoginResponseDTO } from '../dtos/output/login-response.dto.js';
import { AuthServices } from '../services/auth.services.js';

@Controller('auth')
export class LoginController {

    constructor(private readonly service: AuthServices) { }

    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseDTO })
    
    async login(@Body() dto: LoginDTO): Promise<LoginResponseDTO> {
        return await this.service.login(dto)
    }
}

