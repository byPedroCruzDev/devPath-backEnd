import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entities/user.entity";
import AppError from "../errors/appError";

export class SessionServices {
  static async login({ email, password }: any): Promise<object> {
    const userRepository = AppDataSource.getRepository(User);

    const user: any = await userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new AppError("Email or password invalid", 403);
    }
    //pro inferno passwordMatch
    const passwordMatch = await compare(user.password, password);

    const token = jwt.sign({}, process.env.SECRET_KEY!, {
      subject: user.id.toString(),
      expiresIn: "72h",
    });

    delete user.password;
    delete user.confirmPassword;

    return { token, user };
  }
}
