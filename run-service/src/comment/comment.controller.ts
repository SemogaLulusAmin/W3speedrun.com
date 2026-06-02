import { Body, Controller, Post, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthToken } from '../guard/auth.guard';
import { PostComment } from './dto/postComment.dto';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {

    constructor(private commentService : CommentService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    async postComment(@Body() comment: PostComment, @Request() req){
        const userID = req.user.id;
        return this.commentService.postComment(comment, userID);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthToken)
    async deleteComment(@Param('id') id: string, @Request() req){
       const userID = req.user.id;
       
       return this.commentService.deleteComment(id, userID);
    }
}