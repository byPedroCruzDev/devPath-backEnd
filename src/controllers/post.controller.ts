import { Request, Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  static async create(req: Request, res: Response) {
    const userId: number = Number(res.locals.decoded.sub);

    const response: any = await PostService.create(req.body, userId);
    console.log(response);
    return res.status(201).json(response);
  }
  static async listAll(req: Request, res: Response) {
    const response = await PostService.listAll(req.query);

    return res.status(200).json(response);
  }
  static async listOne() {}
  static async update() {}
  static async delete() {}
}
