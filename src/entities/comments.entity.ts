import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { CommentLike } from "./commentLike.entity";
import { Post } from "./post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @OneToMany(() => CommentLike, (like) => like.comment)
  like: CommentLike[];
}
