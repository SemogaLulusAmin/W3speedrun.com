import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RunService } from './run.service';
import { AuthToken } from '../guard/auth.guard';
import { SubmitRun } from './dto/submit.dto';
@ApiTags('runs')
@Controller('runs')
export class RunController {

    constructor(private runService: RunService) {}

    @Get(':id/category')
    async findCategories(@Param('id') id: string){
        return this.runService.findCategories(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthToken)
    @Get(':id/user')
    async findUserRun(@Param('id') id: string, @Request() req){

        const userID = req.user.id;

        return this.runService.findUserRun(id, userID);
    }

    @Get(':id')
    async findRuns(@Param('id') id:string){
        return this.runService.findRuns(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    async submitRun(@Body() run: SubmitRun, @Request() req){

        console.log(req.user);
        const userID = req.user.id;

        return this.runService.submitRun(run, userID);
    } 


}
