import { Controller, Post, Get, UseGuards, Param, Body, Query, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthToken, isAdmin } from './guard/auth.guard';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';
@ApiTags('User')
@Controller('users')

export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('register')
    async register(@Body() user: RegisterDto){
        return this.usersService.register(user);
    }

    @Post('login')
    async login(@Body() user: LoginDto){
        return this.usersService.login(user);
    }

    @Get()
    @UseGuards(AuthToken, isAdmin)
    async FindAll(@Query('role') role?: 'USER' | 'ADMIN'){
        if(role) return this.usersService.findAll(role);
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthToken, isAdmin)
    async FindOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }

    @Put('updateUsername/:id')
    @UseGuards(AuthToken)
    async updateUsername(@Request() req, @Body() user: UpdateDto){
        return this.usersService.updateUsername(req.user.user_id, user);
    }
    
}
