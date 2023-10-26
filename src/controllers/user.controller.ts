import { Request, Response, response } from "express";
import { UserService } from "../services/user.service";
import {
  UserCreate,
  UserRead,
  UserReadArray,
  UserReturn,
} from "../interface/user.interface";

export class UsersController {
  static async create(req: Request, res: Response): Promise<Response> {
    const response: UserReturn = await UserService.create(req.body);
    return res.status(201).json(response);
  }

  static async listAll(req: Request, res: Response): Promise<Response> {
    const users: UserReadArray = await UserService.listAll();
    return res.status(200).json(users);
  }
  static async listOne(req: Request, res: Response) {
    const response: UserRead = await UserService.listOne(req.params.id);

    return res.status(200).json(response);
  }
  static async update(req: Request, res: Response) {
    const response = await UserService.update(req.body, req.params.id);

    return res.status(200).json(response);
  }
  static async delete(req: Request, res: Response) {
    const response = await UserService.delete(req.params.id);

    return res.status(200).json({ message: "Sucesseful" });
  }
}
