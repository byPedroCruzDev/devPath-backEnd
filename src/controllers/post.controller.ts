import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { PostArrayReturn, PostReturn } from "../interface/post.interface";
import {
  postSchema,
  postSchemaArray,
  postSchemaReturn,
} from "../schemas/post.schema";

export class PostController {
  static async create(req: Request, res: Response): Promise<Response> {
    const userId = res.locals.decoded.sub;

    const response = await PostService.create(req.body, userId);

    return res.status(201).json(response);
  }
  static async listAll(req: Request, res: Response) {
    const response = await PostService.listAll();

    return res.status(200).json(postSchemaArray.parse(response));
  }
  static async listOne(req: Request, res: Response): Promise<Response> {
    const response = await PostService.listOne(req.params.id);

    return res.status(200).json(response);
  }
  static async update(req: Request, res: Response) {
    const response = await PostService.update(req.body, req.params.id);
    return res.status(200).json(postSchemaReturn.parse(response));
  }
  static async delete(req: Request, res: Response) {
    const response = await PostService.delete(req.params.id);

    return res.status(200).send({ message: "Susseceful" });
  }
}
