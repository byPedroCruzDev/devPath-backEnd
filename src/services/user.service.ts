import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

class UserService {
  static async create(data: any) {
    const userRepository = AppDataSource.getRepository(User);

    const createUser: any = userRepository.create(data);

    await userRepository.save(createUser);

    const response: any = await userRepository.findOne({
      where: { id: createUser.id },
    });

    const { password, ...userResponse } = response;

    return userResponse;
  }

  static async listOne(req: Request, res: Response) {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}

export default UserService;
