import { Module } from '@nestjs/common';
import { RunController } from './run.controller';
import { RunService } from './run.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RunController],
  providers: [RunService, PrismaService]
})
export class RunModule {}
