import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports : [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService]
})
export class UsersModule {

}
