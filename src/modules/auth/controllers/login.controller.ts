import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/input/login.dto.js';
import { AuthServices } from '../services/auth.services.js';


@Controller('/auth')
export class LoginController {

    constructor(private readonly service: AuthServices) { }

    @Post('/login')
    async login(@Body() dto: LoginDTO): Promise<{ accessToken: string }> {
        return await this.service.login(dto)
    }
}