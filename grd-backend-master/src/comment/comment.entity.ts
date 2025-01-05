import { UserEntity } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
@Entity("comment")
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commId: number;

    @Column()
    content: string;

    @Column()
    postId: number;

    @Column()
    timeStamp: string;

    @Column()
    upvote: number;

    // Many-to-One Relationship with UserEntity
    @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: "CASCADE" }) // UserEntity is referenced here
    user: UserEntity;

    // Many-to-Many Relationship with UserEntity for upvotes
    @ManyToMany(() => UserEntity, (user) => user.upvotedComments)
    @JoinTable() // Create a join table for the many-to-many relationship
    upvoters: UserEntity[];
}
