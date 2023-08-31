import { Request, Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  static async create(req: Request, res: Response) {
    const data: any = req.body;
    const user = req;
    console.log(user);

    const response: any = PostService.create(data, user);

    return res.status(201).json(response);
  }
  static async listAll() {}
  static async listOne() {}
  static async update() {}
  static async delete() {}
}
