import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogInsertion } from './dto/CatalogInsertion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CatalogUpdate } from './dto/CatalogUpdate.dto';
@Injectable()
export class RunCategoryCatalogManagementService {

    constructor(private prisma: PrismaService) {}

    async insertCatalog(runCatalog: CatalogInsertion){
        try{

            const game = await this.prisma.games.findUnique({
                where: {
                    game_id: runCatalog.game_id
                }
            })

            if(!game) throw new NotFoundException('Game you searched does not exist');

            const runCatalogId = crypto.randomUUID();

            await this.prisma.run_categories.create({
                data: {
                    run_category_id: runCatalogId,
                    run_category_name: runCatalog.run_category_name,
                    game_id: runCatalog.game_id
                }
            })

            return {
                message: "Successfully inserted a game into category"
            }

        } catch (error){
            throw error;
        }
    }

    async updateCatalog(id: string, runCatalog: CatalogUpdate){
        try{

            const searchCatalog = await this.prisma.run_categories.findUnique({
                where: {
                    run_category_id: id
                }
            })

            if(!searchCatalog) throw new NotFoundException('run category does not exist')
            
            
            const updatedData : any = {}
            if(runCatalog.game_id) updatedData.game_id = runCatalog.game_id;

            if(runCatalog.run_category_name) updatedData.run_category_name = runCatalog.run_category_name;

            await this.prisma.run_categories.update({
                where: {
                    run_category_id: id
                },
                data: updatedData
            })

            return {
                message: "Successsfully updated a run category"
            }

        } catch(error){
            throw error;
        }
    }

    async deleteCatalog(id: string){
        try{
            const searchCatalog = await this.prisma.run_categories.findUnique({
                where: {
                    run_category_id: id
                }
            })

            if(!searchCatalog) throw new NotFoundException('run category does not exist')
            
            await this.prisma.run_categories.delete({
                where: {
                    run_category_id: id
                }
            })

            return {
                message: "Successfully delete a run category"
            }
        } catch(error){
            throw error;
        }     
    }
}
