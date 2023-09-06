import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserRead, UserReadArray } from "../interface/user.interface";

export class UsersController {
  static async create(req: Request, res: Response): Promise<Response> {
    const response: any = await UserService.create(req.body);
    return res.status(201).json(response);
  }

  static async listAll(req: Request, res: Response): Promise<Response> {
    const users: UserReadArray = await UserService.listAll();
    return res.status(200).json(users);
  }
  static async listOne(req: Request, res: Response) {
    const response = await UserService.listOne(req.params.id);

    return res.status(200).json(response);
  }
  static async update() {}
  static async delete() {}
}
