import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    getHello(): string {
        return this.commentService.getHello();
    }
    
    @Post('/addComment/:userId')
    @UsePipes(ValidationPipe)
    async createComment(
        @Param('userId', ParseIntPipe) userID: number,
        @Body() data: CommentDto,
    ): Promise<any> {
        const comment = await this.commentService.createComment(data, userID);
        if (!comment) {
            throw new NotFoundException({
                message: 'Comment not added',
            });
        }
        return comment;
    }

    @Get('/getComments/:postId')
    async getComments(@Param('postId', ParseIntPipe) postId: number): Promise<any> {
        const comments = await this.commentService.getComments(postId);
        if (!comments || comments.length === 0) {
            throw new NotFoundException({
                message: 'Comments not found for this user',
            });
        }
        return comments;
    }

    @Delete('/deleteComment/:commId')
    async deleteComment(@Param('commId', ParseIntPipe) commId: number): Promise<any> {
        const comment = await this.commentService.deleteComment(commId);
        if (!comment) {
            throw new NotFoundException({
                message: 'Comment not deleted',
            });
        }
        return comment;
    }

    @Post('/upvoteComment/:commId/:userId')
    async upvoteComment(@Param('commId', ParseIntPipe) commId: number, @Param('userId', ParseIntPipe) userId: number): Promise<any> {
        const comment = await this.commentService.upvoteComment(commId, userId);
        if (!comment) {
            throw new NotFoundException({
                message: 'Comment not upvoted',
            });
        }
        return comment;
    }
}
