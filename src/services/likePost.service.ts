import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Like } from "../entities/like.emtity";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";
import { likeSchema } from "../schemas/likePost.schema";
import AppError from "../errors/appError";

export class likePostService {
  static async create(userId: any, postId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);
    const likeRepository = AppDataSource.getRepository(Like);

    const likeOwner: any = await userRepository.findOneBy({ id: userId });
    if (!likeOwner) throw new AppError("You are not owner");

    const post: any = await postRepository.findOneBy({ id: postId });
    if (!post) throw new AppError("Post not found");

    const like = new Like();
    like.post = post;
    like.user = likeOwner;

    const createLike = likeRepository.create(like);

    await likeRepository.save(createLike);

    const likes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });

    return likeSchema.parse(likes.reverse());
  }
  static async listAll(postId: any) {
    const likeRepository = AppDataSource.getRepository(Like);

    const likes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });
    if (!likes) throw new AppError("likes not found");
    return likeSchema.parse(likes);
  }
  static async listOne(postId: any, likeId: any) {
    const likeRepository = AppDataSource.getRepository(Like);

    const like: any = await likeRepository.find({
      where: { post: { id: postId }, id: likeId },
      relations: ["user"],
    });
    if (!like) throw new AppError("likes not found");
    return likeSchema.parse(like);
  }

  static async delete(postId: any, likeId: any) {
    const likeRepository = AppDataSource.getRepository(Like);

    const likes: any = await likeRepository.findOne({
      where: { post: { id: postId }, id: likeId },
      relations: ["user"],
    });

    await likeRepository.delete(likes);

    const resLikes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });
    if (!likes) throw new AppError("likes not found");

    return likeSchema.parse(resLikes);
  }
}
