import { Module } from '@nestjs/common';
import { GameCatalogController } from './game_catalog.controller';
import { GameCatalogService } from './game_catalog.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports : [
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d'}
      })
    ],
  controllers: [GameCatalogController],
  providers: [GameCatalogService, PrismaService]
})
export class GameCatalogModule {}
