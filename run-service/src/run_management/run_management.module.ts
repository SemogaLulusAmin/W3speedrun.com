import { Module } from '@nestjs/common';
import { RunManagementController } from './run_management.controller';
import { RunManagementService } from './run_management.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '7d'}
        })
      ],
  controllers: [RunManagementController],
  providers: [RunManagementService, PrismaService]
})
export class RunManagementModule {}
