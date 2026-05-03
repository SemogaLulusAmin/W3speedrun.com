import { Controller,Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GameCatalogService } from './game_catalog.service';

@ApiTags("Game_Catalog")
@Controller('games')
export class GameCatalogController {

    constructor(private gameCatalogService: GameCatalogController) {}

    @Get()
    async findAll(){
        return this.gameCatalogService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.gameCatalogService.findOne(id);
    }
}
