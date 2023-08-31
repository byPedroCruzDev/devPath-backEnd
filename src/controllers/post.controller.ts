import { Request, Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  static async create(req: Request, res: Response) {
    const data: any = req.body;
    const id: any = req.user.id;

    const response: any = PostService.create(data, id);

    return res.status(201).json(response);
  }
  static async listAll() {}
  static async listOne() {}
  static async update() {}
  static async delete() {}
}
