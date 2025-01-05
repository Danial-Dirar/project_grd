import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './comment.dto';
import { UserEntity } from 'src/user/user.entity';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRespository: Repository<UserEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRespository: Repository<CommentEntity>,
    ) {}
    getHello(): string {
        return 'admin daniel is testing this API thrugh postman';
    }

    async createComment(data: CommentDto, userId: number): Promise<any> {
        const user = await this.userRespository.findOneBy({ id: userId }); // Ensure the user exists
        if (!user) {
            throw new NotFoundException({ message: 'User not found' });
        }

        const newComment = this.commentRespository.create({
            ...data,
            timeStamp: new Date().toISOString(),
            user,
            upvote: 0,
        });
        return await this.commentRespository.save(newComment);
    }

    async getComments(postId: number): Promise<any> {
        const comments = await this.commentRespository.find({
            where: { postId:postId }, // Filter comments by user ID
            relations: ['user','upvoters'], // Load the related user
        });

        return comments;
    }

    async deleteComment(commentId: number): Promise<any> {
        const comment = await this.commentRespository.findOneBy({ commId: commentId });
        if (!comment) {
            throw new NotFoundException({ message: 'Comment not found' });
        }
        return await this.commentRespository.remove(comment);
    }

    async upvoteComment(commentId: number, userId: number): Promise<any> {
        // Fetch the comment along with its upvoters
        const comment = await this.commentRespository.findOne({
            where: { commId: commentId },
            relations: ['upvoters'], // Fetch upvoters relation
        });
    
        if (!comment) {
            throw new NotFoundException({ message: 'Comment not found' });
        }
    
        // Check if the user has already upvoted the comment
        const hasUpvoted = comment.upvoters.some((user) => user.id === userId);
        if (hasUpvoted) {
            throw new BadRequestException({ message: 'User has already upvoted this comment' });
        }
    
        // Fetch the user who is upvoting
        const user = await this.userRespository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException({ message: 'User not found' });
        }
    
        // Add the user to the upvoters list and increment the upvote count
        comment.upvoters.push(user);
        comment.upvote += 1;
    
        // Save the updated comment
        return await this.commentRespository.save(comment);
    }
}

