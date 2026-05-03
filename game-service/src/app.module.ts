import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GameCatalogModule } from './game_catalog/game_catalog.module';

@Module({
  imports: [UsersModule, GameCatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
