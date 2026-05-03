import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Post('register')
    async register(@Body() user: RegisterDto){
        return this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user: LoginDto){
        return this.authService.login(user);
    }
}
