import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import {
  UserCreate,
  UserRead,
  UserReadArray,
  UserReturn,
} from "../interface/user.interface";
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

  static async listAll(): Promise<UserReadArray> {
    const userRepository = AppDataSource.getRepository(User);

    const allUsers = await userRepository.find();
    return userReadSchemaArray.parse(allUsers);
  }

  static async update(data: any, id: any): Promise<Response> {
    const userRepository = AppDataSource.getRepository(User);

    const user: any = await userRepository.findOneBy({
      id: id,
    });

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const userUpdate = await userRepository.update(user!.id, data);

    const { password, ...userWithoutPass } = (await userRepository.findOneBy({
      id: id,
    })) as any;

    return user;
  }

  static async delete(id: any): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.delete({
      id: id,
    });

    return user;
  }
}
