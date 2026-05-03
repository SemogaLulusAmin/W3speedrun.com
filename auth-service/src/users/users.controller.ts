import { Controller, Post, Get, UseGuards, Param, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthToken, isAdmin } from './middleware/auth.middleware';

@ApiTags('User')
@Controller('users')
export class UsersController {

    @Post('register')
    async register(@Body() user: {}){
        
    }

    @Post('login')
    async login(@Body() user: {}){

    }

    @Get()
    @UseGuards(AuthToken, isAdmin)
    async FindAll(@Query('role') role?: 'USER' | 'ADMIN'){
        return []
    }

    @Get(':id')
    @UseGuards(AuthToken, isAdmin)
    async FindOne(@Param('id') id: string){

    }

}
