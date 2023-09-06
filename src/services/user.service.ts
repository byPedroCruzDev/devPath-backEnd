import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { UserCreate, UserRead, UserReturn } from "../interface/user.interface";
import {
  userReadSchema,
  userReadSchemaArray,
  userReturnSchema,
} from "../schemas/user.schemas";

export class UserService {
  static async create(data: UserCreate): Promise<UserReturn> {
    const userRepository = AppDataSource.getRepository(User);

    const createUser: User = userRepository.create(data);

    await userRepository.save(createUser);

    return userReturnSchema.parse(createUser);
  }

  static async listOne(id: any) {
    const userRepository = AppDataSource.getRepository(User);

    const user: any = await userRepository.findOne({
      where: { id: id },
      relations: { post: true },
    });

    return user;
  }

  static async listAll() {
    const userRepository = AppDataSource.getRepository(User);

    const allUsers = await userRepository.find();
    return userReadSchemaArray.parse(allUsers);
  }

  static async update() {}

  static async delete() {}
}
