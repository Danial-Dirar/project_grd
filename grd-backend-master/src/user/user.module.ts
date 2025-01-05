import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { CommentEntity } from 'src/comment/comment.entity';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, CommentEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
