import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostComment } from './dto/postComment.dto';
import { AppService } from 'src/app.service';
import { AuthToken, isAdmin } from 'src/guard/auth.guard';
import type { Request, Response } from 'express';
import { SubmitRun } from './dto/submit.dto';

@ApiTags('Run Service Gateway')
@Controller()
export class RunGatewayController {

    constructor(private readonly appService: AppService) {}

    @Post('comments')
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    @ApiOperation({ summary: 'Post a comment on a game' })
    async postComment(@Body() body: PostComment, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, '/comments');
        return res.status(result.status).json(result.data);
    }

    @Delete('comments/:id')
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    @ApiOperation({ summary: 'Delete a comment' })
    async deleteComment(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/comments/${id}`);
        return res.status(result.status).json(result.data);
    }

    @Get('runs/:id/category')
    @ApiOperation({ summary: 'Get categories for a specific run' })
    async findCategories(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/runs/${id}/category`);
        return res.status(result.status).json(result.data);
    }

    @Get('runs/:id/user')
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    @ApiOperation({ summary: 'Get runs for a specific user' })
    async findUserRun(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/runs/${id}/user`);
        return res.status(result.status).json(result.data);
    }

    @Get('runs/:id')
    @ApiOperation({ summary: 'Get details for a specific run' })
    async findRuns(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/runs/${id}`);
        return res.status(result.status).json(result.data);
    }

    @Post('runs')
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    @ApiOperation({ summary: 'Submit a new run' })
    async submitRun(@Body() body: SubmitRun, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, '/runs');
        return res.status(result.status).json(result.data);
    }

    @Get('admin/runs/:status')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Find runs by status' })
    async findAdminRuns(@Param('status') status: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/admin/runs/${status}`);
        return res.status(result.status).json(result.data);
    }

    @Post('admin/runs/:id/accept')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Accept a run' })
    async acceptRun(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/admin/runs/${id}/accept`);
        return res.status(result.status).json(result.data);
    }

    @Post('admin/runs/:id/reject')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Reject a run' })
    async rejectRun(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('run', req, `/admin/runs/${id}/reject`);
        return res.status(result.status).json(result.data);
    }
}
