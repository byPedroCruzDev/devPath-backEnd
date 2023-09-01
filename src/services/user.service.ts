import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { UserCreate, UserRead, UserReturn } from "../interface/user.interface";
import { userReadSchema, userReturnSchema } from "../schemas/user.schemas";

export class UserService {
  static async create(data: UserCreate): Promise<UserReturn> {
    const userRepository = AppDataSource.getRepository(User);

    const createUser: User = userRepository.create(data);

    await userRepository.save(createUser);

    return userReturnSchema.parse(createUser);
  }

  static async listOne(req: Request, res: Response) {}

  static async listAll() {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
