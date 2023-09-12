import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Like } from "../entities/like.emtity";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

export class likePostService {
  static async create(userId: any, postId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);
    const likeRepository = AppDataSource.getRepository(Like);

    const likeOwner: any = await userRepository.findOneBy({ id: userId });

    const post: any = await postRepository.findOneBy({ id: postId });

    const like = new Like();
    like.post = post;
    like.user = likeOwner;

    const createLike = likeRepository.create(like);

    await likeRepository.save(createLike);

    const likes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });

    return likes.reverse();
  }
  static async listAll(postId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const likeRepository = AppDataSource.getRepository(Like);

    const likes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });

    return likes;
  }
  static async listOne(postId: any, likeId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const likeRepository = AppDataSource.getRepository(Like);

    const likes: any = await likeRepository.find({
      where: { post: { id: postId }, id: likeId },
      relations: ["user"],
    });

    return likes;
  }

  static async delete(postId: any, likeId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const likeRepository = AppDataSource.getRepository(Like);

    const likes: any = await likeRepository.findOne({
      where: { post: { id: postId }, id: likeId },
      relations: ["user"],
    });
    console.log(likes, "aquiiiii");

    await likeRepository.delete(likes);

    const resLikes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });

    return resLikes;
  }
}
