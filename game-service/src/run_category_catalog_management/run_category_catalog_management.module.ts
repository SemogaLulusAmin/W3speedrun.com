import { Module } from '@nestjs/common';
import { RunCategoryCatalogManagementController } from './run_category_catalog_management.controller';
import { RunCategoryCatalogManagementService } from './run_category_catalog_management.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RunCategoryCatalogManagementController],
  providers: [RunCategoryCatalogManagementService, PrismaService]
})
export class RunCategoryCatalogManagementModule {}
