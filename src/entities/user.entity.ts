import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./comments.entity";

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

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
