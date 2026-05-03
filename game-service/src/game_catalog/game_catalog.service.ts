import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameCatalogService {

    constructor(private prisma: PrismaService) {}

    async findAll(){
        try{
            const games = await this.prisma.games.findMany();
            return games;
        } catch (error){
            throw error;
        }
    }

    async findOne(id: number){
        try{
            const game = await this.prisma.games.findUnique({
                where: {
                    game_id : id
                }
            })
            return game;
        }catch (error){
            throw error;
        }
    }

}
