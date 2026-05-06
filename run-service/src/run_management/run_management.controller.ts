import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthToken, isAdmin } from 'src/guard/auth.guard';
import { RunManagementService } from './run_management.service';

@ApiTags('Run Management')
@Controller('admin/runs')
export class RunManagementController {

    constructor(private runService: RunManagementService) {}

    @Get(':status')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async findRuns(@Param('status') status: 'PENDING' | 'ACCEPTED' | 'REJECTED'){
        return this.runService.findRuns(status);
    }

    @Post(':id/accept')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async acceptRun(@Param('id') id: string){
        return this.runService.acceptRuns(id);
    }

    @Post(':id/reject')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async  rejectRun(@Param('id') id: string){
        return this.runService.rejectRuns(id);
    }

}
