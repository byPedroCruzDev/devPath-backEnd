import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comments.entity";

@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;
}