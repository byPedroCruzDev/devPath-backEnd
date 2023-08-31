import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUser } from "../interface/user.interface";

export class UserService {
  static async create(data: IUser) {
    const userRepository = AppDataSource.getRepository(User);

    const createUser: IUser = userRepository.create(data);

    await userRepository.save(createUser);

    const response: any = await userRepository.findOne({
      where: { id: createUser.id },
    });
    console.log(response);

    const { password, ...userResponse } = response;

    return userResponse;
  }

  static async listOne(req: Request, res: Response) {}

  static async listAll() {
    const userRepository = AppDataSource.getRepository(User);

    const findUser: any = await userRepository.find();

    return { message: "Lista de usuarios", ...findUser.reverse() };
  }

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
