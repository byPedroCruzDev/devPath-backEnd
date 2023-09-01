import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserRead } from "../interface/user.interface";

export class UsersController {
  static async create(req: Request, res: Response): Promise<Response> {
    const response: any = await UserService.create(req.body);
    return res.status(201).json(response);
  }
  static async listAll(req: Request, res: Response) {}
  static async listOne() {}
  static async update() {}
  static async delete() {}
}
