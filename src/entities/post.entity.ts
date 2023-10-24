import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comments.entity";
import { Like } from "./like.emtity";
@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  content: string;

  @Column()
  creationDate: Date;

  @ManyToOne(() => User, (user) => user.post)
  author: User;

  @OneToMany(() => Like, (like) => like.post)
  like: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
