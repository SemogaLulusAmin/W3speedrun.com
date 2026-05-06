import { Module } from '@nestjs/common';
import { RunCategoryCatalogManagementController } from './run_category_catalog_management.controller';
import { RunCategoryCatalogManagementService } from './run_category_catalog_management.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d'}
      })
    ],
  controllers: [RunCategoryCatalogManagementController],
  providers: [RunCategoryCatalogManagementService, PrismaService]
})
export class RunCategoryCatalogManagementModule {}
