import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { SubmitRun } from './dto/submit.dto';

@Injectable()
export class RunService {

    constructor(private prisma: PrismaService) {}

    formatDate(run_duration : BigInt){
        const totalSeconds = Number(run_duration);

        const hours = Math.floor(totalSeconds / 3600);
        const remainingSecondsAfterHours = totalSeconds % 3600;

        const minutes = Math.floor(remainingSecondsAfterHours / 60);
        const seconds = remainingSecondsAfterHours % 60;

        const hFormat = hours > 0 ? `${hours} Hour(s) ` : "";
        const mFormat = minutes > 0 ? `${minutes} Minute(s) ` : "";
        const sFormat = seconds > 0 ? `${seconds} Second(s)` : "";

        return `${hFormat}${mFormat}${sFormat}`.trim();
    }

    async findCategories(id: string){

        try{
            const runs = await this.prisma.runs.findMany({
                where: {
                    run_category_id: id,
                    status: "ACCEPTED"
                },
                orderBy: {
                    run_duration: 'asc'
                }
            })

            return runs.map(run => ({
                ...run,
                run_duration: this.formatDate(run.run_duration)
            }))
        } catch (error){
            throw error;
        }

    }

    async findUserRun(id: string, userID: string){

        try{
            if(id === userID){
            const runs = await this.prisma.runs.findMany({
                where: {
                    user_id: id
                }
            })

            return runs.map(run => ({
                ...run,
                run_duration: this.formatDate(run.run_duration),
            }))

            } else {
                const runs = await this.prisma.runs.findMany({
                    where: {
                        user_id: id,
                        status: "ACCEPTED"
                    }
                })

                return runs.map(run => ({
                    ...run,
                    run_duration: this.formatDate(run.run_duration)
                }))
            }
        } catch (error){
            throw error;
        }
    }

    async findRuns(id: string){
        
        try{
            
            const run = await this.prisma.runs.findUnique({
                where: {
                    run_id: id
                }
            })

            if (!run) {
                throw new NotFoundException(`Run with ID ${id} not found`);
            }

            const run_category = await axios.get(`http://localhost:3001/categories/${run?.run_category_id}`)
            const run_categories_data = run_category.data;

            const runner = await axios.get(`http://localhost:3000/users/${run?.user_id}/profile`)
            const runner_data = runner.data;

            const game_req  = await axios.get(`http://localhost:3001/games/${run_categories_data.game_id}`)
            const game_data = game_req.data; 

            const comment = await this.prisma.comments.findMany({
                where: {
                    run_id: id
                }
            })


            return {
                ...run, 
                run_duration: this.formatDate(run.run_duration),
                games: game_data,
                runner: runner_data,
                run_category_name : run_categories_data.run_category_name,
                comments: comment
            }

        } catch(error){
            throw error;
        }
    }

    async submitRun(run: SubmitRun, userID: string){

        try{

            const run_category = await axios.get(`http://localhost:3001/categories/${run?.run_category_id}`)

            if(!run_category.data) throw new NotFoundException('run category ID does not exist')

            const runID = crypto.randomUUID();
            
            await this.prisma.runs.create({
                data: {
                    run_id: runID,
                    run_category_id: run_category.data.run_category_id,
                    user_id: userID,
                    vod_url: run.vod_url,
                    run_duration: run.run_duration,
                    status: "PENDING"
                }
            })

            return {
                message: "Successfull submit a new run"
            }
        
        } catch (error){
            throw error;
        }

    }



}
