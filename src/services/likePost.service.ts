import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Like } from "../entities/like.emtity";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

export class likePostService {
  static async create(userId: any, postId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    const likeOwner = await userRepository
      .createQueryBuilder("user")
      .where("user.id = id", { id: userId })
      .getOne();

    const post: any = await postRepository
      .createQueryBuilder("post")
      .where("post.id = id", { id: postId })
      .getOne();

    post.like = likeOwner;

    const createLike = postRepository.create(post);
    await postRepository.save(createLike);

    delete post.like.password;
    delete post.like.confirmPassword;

    return post;
  }
  static async listAll() {
    const likePostRepository = AppDataSource.getRepository(Like);

    const allLikeInPost = await likePostRepository.find();

    return allLikeInPost;
  }
  static async listOne() {}
  static async delete(req: Request, res: Response) {}
}

/* const post: any = postRepository.create({
    ...data,
    author: postOwner,
    creationDate: new Date(),
    relations: { user: true, comment: true, like: true },
  });
  await postRepository.save(post);
  delete post.author.password;
  delete post.author.confirmPassword; */
