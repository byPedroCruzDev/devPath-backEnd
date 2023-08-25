import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./comments.entity";
import { Post } from "./post.entity";
import { Like } from "./like.emtity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  confirmPassword: string;
  @Column()
  email: string;
  @Column()
  image: string;
  @Column()
  occupation: string;
  @Column({ default: false })
  isAdm: boolean;

  @OneToMany(() => Post, (post) => post.author)
  post: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];
}
