import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RunManagementService {

    constructor(private prisma: PrismaService) {}

    async findRuns(status: 'PENDING' | 'ACCEPTED' | 'REJECTED'){

        try{
            const runs = await this.prisma.runs.findMany({
                where: {
                    status: status
                }
            })

             return runs.map(run => ({
                ...run,
                run_duration:           run.run_duration.toString()
            }))

        } catch (error){
            throw error;
        }
    }

    async acceptRuns(id: string){

        try{

            const run = await this.prisma.runs.findUnique({ 
                where: {
                    run_id : id
                }
            })

            if(!run) throw new NotFoundException('run is not found') 

            await this.prisma.runs.update({
                where:{
                    run_id: id
                },
                data: {
                    status: 'ACCEPTED',
                    verified_at: new Date()
                }
            })

            return {
                message: "Successfull accept a run"
            }

        } catch (error){
            throw error;
        }
    }

    async rejectRuns(id: string){
        try{

            const run = await this.prisma.runs.findUnique({ 
                where: {
                    run_id : id
                }
            })

            if(!run) throw new NotFoundException('run is not found') 

            await this.prisma.runs.update({
                where:{
                    run_id: id
                },
                data: {
                    status: 'REJECTED',
                    verified_at: new Date()
                }
            })

            return {
                message: "Successfull reject a run"
            }

        } catch (error){
            throw error;
        }

    }

}
