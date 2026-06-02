import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import type {Request, Response} from 'express';
import { GameInsertion } from './dto/GameInsertion.dto';
import { AuthToken, isAdmin } from 'src/guard/auth.guard';
import { GameUpdate } from './dto/GameUpdate.dto';
import { CatalogInsertion } from './dto/CatalogInsertion.dto';
import { CatalogUpdate } from './dto/CatalogUpdate.dto';

@ApiTags('Game Service Gateway')
@Controller()
export class GameGatewayController {

    constructor(private readonly appService: AppService) {}
    
    @Get('games')
    @ApiOperation({ summary: 'Retrieve all games from the catalog' })
    async findAllGames(@Req() req: Request, @Res() res: Response){
        const result = await this.appService.proxyRequest('game', req, '/games');
        return res.status(result.status).json(result.data);
    }

    @Get('games/:id')
    @ApiOperation({ summary: 'Get details of a specific game' })
    async findOneGame(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const targetPath = `/games/${id}`;
        const result = await this.appService.proxyRequest('game', req, targetPath);
        return res.status(result.status).json(result.data);
    }

    @Post('admin/games')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Insert a new game' })
    async insertGame(@Body() game: GameInsertion, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('game', req, '/admin/games');
        return res.status(result.status).json(result.data);
    }

    @Patch('admin/games/:id/update')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Update an existing game' })
    async updateGame(@Param('id') id: string, @Body() game: GameUpdate, @Req() req: Request, @Res() res: Response) {
        const targetPath = `/admin/games/${id}/update`;
        const result = await this.appService.proxyRequest('game', req, targetPath);
        return res.status(result.status).json(result.data);
    }

    @Delete('admin/games/:id/delete')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Delete a game' })
    async deleteGame(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const targetPath = `/admin/games/${id}/delete`;
        const result = await this.appService.proxyRequest('game', req, targetPath);
        return res.status(result.status).json(result.data);
    }

    @Get('categories/:id')
    @ApiOperation({ summary: 'Get a specific run category by ID' })
    async findACategory(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const targetPath = `/categories/${id}`;
        
        const result = await this.appService.proxyRequest('game', req, targetPath);
        
        return res.status(result.status).json(result.data);
    }

    @Post('admin/categories')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    @ApiOperation({ summary: 'Admin: Insert a new category' })
    async insertCatalog(@Body() body: CatalogInsertion, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('game', req, '/admin/categories');
        return res.status(result.status).json(result.data);
    }

    @Patch('admin/categories/:id/update')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Admin: Update a category' })
    @UseGuards(AuthToken, isAdmin)
    async updateCatalog(@Param('id') id: string, @Body() body: CatalogUpdate, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('game', req, `/admin/categories/${id}/update`);
        return res.status(result.status).json(result.data);
    }

    @Delete('admin/categories/:id/delete')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Admin: Delete a category' })
    async deleteCatalog(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.appService.proxyRequest('game', req, `/admin/categories/${id}/delete`);
        return res.status(result.status).json(result.data);
    }

}   
