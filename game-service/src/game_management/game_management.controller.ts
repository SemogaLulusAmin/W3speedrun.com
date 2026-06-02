import { Controller, Delete, Patch, Post, UseGuards, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthToken, isAdmin } from '../guard/auth.guard';
import { GameInsertion } from './dto/GameInsertion.dto';
import { GameUpdate } from './dto/GameUpdate.dto';
import { GameManagementService } from './game_management.service';

@ApiTags('Game Management')
@Controller('admin/games')
export class GameManagementController {

    constructor(private gameService : GameManagementService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async insertGame(@Body() game : GameInsertion){
        return this.gameService.insertGame(game);
    }

    @Patch(':id/update')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async UpdateGame(@Param('id') id: string,@Body() game: GameUpdate){
        return this.gameService.updateGame(id,game);
    }

    @Delete(':id/delete')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async DeleteGame(@Param('id') id: string){
        return this.gameService.deleteGame(id);
    }
}
