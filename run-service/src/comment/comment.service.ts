import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PostComment } from './dto/postComment.dto';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {

    constructor(private prisma: PrismaService) {}

    async postComment(comment: PostComment, userID){
        try {

            const user = await axios.get( `http://localhost:3000/users/${comment.user_id}/profile`)
            
            if(!user.data || !user.data.username) throw new NotFoundException('User not found');
            if(String(user.data.user_id).trim() !== String(userID).trim()) throw new UnauthorizedException('Not Authorized!')

            const run = await this.prisma.runs.findUnique({
                where: {
                    run_id: comment.run_id
                }
            })

            if(!run) throw new NotFoundException('Run not found');

            const commentId = crypto.randomUUID()

            await this.prisma.comments.create({
                data: {
                    comment_id: commentId,
                    run_id: comment.run_id,
                    user_id: comment.user_id,
                    comment: comment.comment
                }
            })

            return {
                message: "Successfully insert a new comment"
            }


        } catch(error){
            throw error;
        }
    }

    async deleteComment(id: string, userID: string){

        try{

            const comment = await this.prisma.comments.findUnique({
                where: {
                    comment_id: id
                }
            })

            if(!comment) throw new NotFoundException('Comment not found')
            if(comment.user_id !== userID) throw new UnauthorizedException('Do not authorized')
            
            const deleteComment = await this.prisma.comments.delete({
                where: {
                    comment_id: id
                }
            })

            return {
                message: "Successfull delete a comment"
            }

        } catch(error){
           throw error; 
        }

    }

}
