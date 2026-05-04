import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameCatalogModule } from './game_catalog/game_catalog.module';
import { GameManagementModule } from './game_management/game_management.module';
import { RunCategoryCatalogModule } from './run_category_catalog/run_category_catalog.module';
import { RunCategoryCatalogManagementModule } from './run_category_catalog_management/run_category_catalog_management.module';

@Module({
  imports: [GameCatalogModule, GameManagementModule, RunCategoryCatalogModule, RunCategoryCatalogManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
