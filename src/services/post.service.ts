import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

export class PostService {
  static async create(data: any, id: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);
    console.log(id);

    const postOwner = await userRepository.findOneBy({ id: id });

    const post: any = postRepository.create({
      ...data,
      author: postOwner,
      creationDate: new Date(),
      relations: { user: true, comment: true, like: true },
    });
    await postRepository.save(post);
    delete post.author.password;
    delete post.author.confirmPassword;

    return post;
  }

  static async listOne(id: any) {
    const postRepository = AppDataSource.getRepository(Post);

    const post: any = await postRepository.findOne({
      where: { id: id },
      relations: { author: true, comments: { author: true }, like: true },
    });

    delete post.author.password;
    delete post.author.confirmPassword;

    return post;
  }

  static async listAll(data: any): Promise<Response> {
    const postRepository = AppDataSource.getRepository(Post);

    const post: any = await postRepository.find({
      relations: { author: true, like: true, comments: true },
    });

    return post;
  }

  static async update(data: any, id: any) {
    const postRepository = AppDataSource.getRepository(Post);

    const post: any = await postRepository.findOne({
      where: { id: id },
      relations: { author: true, like: true, comments: true },
    });

    const postUpdate: any = postRepository.create({
      ...post,
      ...data,
    });

    await postRepository.save(postUpdate);

    delete postUpdate.author.password;
    delete postUpdate.author.confirmPassword;

    return postUpdate;
  }

  static async delete(id: any) {
    const postRepository = AppDataSource.getRepository(Post);

    const deletedPost: any = await postRepository.delete({ id: id });

    return deletedPost;
  }
}
