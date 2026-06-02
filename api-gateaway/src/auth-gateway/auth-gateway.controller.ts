import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';

@ApiTags('Auth Service Gateway')
@Controller('')
export class AuthGatewayController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/register')
  @ApiOperation({summary: "Register through auth service"})
  async register(@Body() user: RegisterDto, @Req() req: Request, @Res() res: Response) {
    const result = await this.appService.proxyRequest('auth', req, '/auth/register');
    return res.status(result.status).json(result.data);
  }

  @Post('auth/login')
  @ApiOperation({summary: "Login through auth service"})
  async login(@Body() user: LoginDto, @Req() req: Request, @Res() res: Response) {
    const result = await this.appService.proxyRequest('auth', req, '/auth/login');
    return res.status(result.status).json(result.data);
  }

  @Get('users/:id/profile')
  @ApiOperation({summary: "Get an user through auth service"})
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const targetPath = `/users/${id}/profile`; 
          
    const result = await this.appService.proxyRequest('auth', req, targetPath);
    return res.status(result.status).json(result.data);
  }
}