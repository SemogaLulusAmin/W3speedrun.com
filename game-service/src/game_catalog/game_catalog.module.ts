import { Module } from '@nestjs/common';
import { GameCatalogController } from './game_catalog.controller';
import { GameCatalogService } from './game_catalog.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GameCatalogController],
  providers: [GameCatalogService, PrismaService]
})
export class GameCatalogModule {}
