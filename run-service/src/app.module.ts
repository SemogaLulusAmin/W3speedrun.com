import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameCatalogModule } from './game_catalog/game_catalog.module';
import { GameManagementModule } from './game_management/game_management.module';
import { RunCategoryCatalogModule } from './run_category_catalog/run_category_catalog.module';
import { RunCategoryCatalogManagementModule } from './run_category_catalog_management/run_category_catalog_management.module';
import { RunModule } from './run/run.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [GameCatalogModule, GameManagementModule, RunCategoryCatalogModule, RunCategoryCatalogManagementModule, RunModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
