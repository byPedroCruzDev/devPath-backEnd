import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

export class PostService {
  static async create(data: any, id: any) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);
    console.log(data);
    console.log(id);

    const postOwner = await userRepository
      .createQueryBuilder("user")
      .where("user.id = id", { id: id })
      .getOne();
  }

  static async listOne(req: Request, res: Response) {}

  static async listAll() {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
