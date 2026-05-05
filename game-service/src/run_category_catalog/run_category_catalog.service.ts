import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RunCategoryCatalogService {

    constructor(private prisma : PrismaService) {}

    async findOne(id: string){
        try{

            const runCategory = await this.prisma.run_categories.findUnique({
                where: {
                    run_category_id: id
                }
            })

            return runCategory;
            
        } catch(error){
            throw error;
        }
    }

}
