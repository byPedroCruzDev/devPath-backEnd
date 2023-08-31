import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UsersController {
  static async create(req: Request, res: Response) {
    const data: any = req.body;

    const response: any = await UserService.create(data);
    return res.status(201).json(response);
  }
  static async listAll() {
    const response: any = await UserService.listAll();
    console.log(response);
    return response;
  }
  static async listOne() {}
  static async update() {}
  static async delete() {}
}
