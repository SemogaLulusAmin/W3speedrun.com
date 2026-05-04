import { Module } from '@nestjs/common';
import { RunCategoryCatalogService } from './run_category_catalog.service';
import { RunCategoryCatalogController } from './run_category_catalog.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RunCategoryCatalogService, PrismaService],
  controllers: [RunCategoryCatalogController]
})
export class RunCategoryCatalogModule {
  
}
