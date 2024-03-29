import { Request, Response } from "express";
import { likePostService } from "../services/likePost.service";

export class likeController {
  static async create(req: Request, res: Response) {
    const userId = res.locals.decoded.sub;

    const response: any = await likePostService.create(
      userId,
      req.params.postId
    );
    return res.status(201).json(response);
  }
  static async listAll(req: Request, res: Response) {
    const response = await likePostService.listAll(req.params.postId);
    return res.status(200).json(response);
  }
  static async listOne(req: Request, res: Response) {
    const response = await likePostService.listOne(
      req.params.postId,
      req.params.likeId
    );
    return res.status(200).json(response);
  }
  static async delete(req: Request, res: Response) {
    const response = await likePostService.delete(
      req.params.postId,
      req.params.likeId
    );

    return res.status(200).json(response);
  }
}
