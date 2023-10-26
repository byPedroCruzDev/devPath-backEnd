import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";
import AppError from "../errors/appError";
import {
  createPostSchema,
  postSchemaArray,
  postSchemaReturn,
} from "../schemas/post.schema";

export class PostService {
  static async create(data: any, id: string) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    const postOwner: User | null = await userRepository.findOneBy({
      id: id,
    });

    const post: any = postRepository.create({
      ...data,
      author: postOwner,
      creationDate: new Date(),
    });
    await postRepository.save(post);

    return createPostSchema.parse(post);
  }

  static async listOne(id: any) {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: id },
      relations: { author: true, comments: { author: true }, like: true },
    });

    return postSchemaReturn.parse(post);
  }

  static async listAll() {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.find({
      relations: { author: true, like: true, comments: true },
    });
    if (!post) throw new AppError("Post not found!");

    return postSchemaArray.parse(post);
  }

  static async update(data: any, id: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const post: any = await postRepository.findOne({
      where: { id: id },
      relations: { author: true, like: true, comments: true },
    });
    if (!post) throw new AppError("Post not found!");

    const postUpdate: any = postRepository.create({
      ...post,
      ...data,
    });

    await postRepository.save(postUpdate);

    return postSchemaReturn.parse(postUpdate);
  }

  static async delete(id: any) {
    const postRepository = AppDataSource.getRepository(Post);

    const deletedPost: any = await postRepository.delete({ id: id });
    if (!deletedPost) throw new AppError("Post not found!");

    return deletedPost;
  }
}
