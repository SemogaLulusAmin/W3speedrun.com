import { Module } from '@nestjs/common';
import { GameManagementController } from './game_management.controller';
import { GameManagementService } from './game_management.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
    JwtModule.register({
        secret: process.env.JWT_SECRET
        })
    ],
  controllers: [GameManagementController],
  providers: [GameManagementService, PrismaService]
})
export class GameManagementModule {}
