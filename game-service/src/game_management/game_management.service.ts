import { Injectable, NotFoundException } from '@nestjs/common';
import { GameInsertion } from './dto/GameInsertion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameUpdate } from './dto/GameUpdate.dto';

@Injectable()
export class GameManagementService {

    constructor(private prisma : PrismaService) {}

    async insertGame(game: GameInsertion){
        try{

            const gameId = crypto.randomUUID();

            await this.prisma.games.create({
                data: {
                    game_id: gameId,
                    game_name: game.game_name,
                    description: game.game_description
                }
            })

            return {
                message: "Successfully insert a new game"
            }

        } catch (error){
            throw error;
        }
    }

    async updateGame(id: string, game: GameUpdate){
        try{

            const searchGame = await this.prisma.games.findUnique({
                where: {
                    game_id: id
                }
            })

            if(!searchGame) throw new NotFoundException("Game Not Found!");

            const updateData: any = {}
            if(game.game_name) updateData.game_name = game.game_name
            if(game.description) updateData.description = game.description

            await this.prisma.games.update({
                where: {
                    game_id: id
                },
                data: updateData
            })

            return {
                message: "Successfully update a game"
            }

        } catch(error){
            throw error;
        }
    }

    async deleteGame(id: string){
        try{

            const searchGame = await this.prisma.games.findUnique({
                where: {
                    game_id: id
                }
            })

            if(!searchGame) throw new NotFoundException("Game Not Found!");

            await this.prisma.games.delete({
                where: {
                    game_id: id
                }
            })

            return {
                message: "Successfully delete a game"
            }

        } catch(error){
            throw error;
        }
    }

}
