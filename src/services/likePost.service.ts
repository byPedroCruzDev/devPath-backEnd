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

    const likeOwner: any = await userRepository
      .createQueryBuilder("user")
      .where("user.id = id", { id: userId })
      .getOne();

    const post: any = await postRepository.findOneBy({ id: postId });

    const like = new Like();
    like.post = post;
    like.user = likeOwner;

    const createLike = likeRepository.create(like);

    await likeRepository.save(createLike);

    return createLike;
  }
  static async listAll(postId: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const likeRepository = AppDataSource.getRepository(Like);
    console.log(postId);

    const likes: any = await likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
    });
    console.log(likes);

    return likes;
  }
  static async listOne() {}
  static async delete(req: Request, res: Response) {}
}
