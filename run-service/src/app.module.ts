import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunModule } from './run/run.module';
import { CommentModule } from './comment/comment.module';
import { RunManagementModule } from './run_management/run_management.module';

@Module({
  imports: [RunModule, CommentModule, RunManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
