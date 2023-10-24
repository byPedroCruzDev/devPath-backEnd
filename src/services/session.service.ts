import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entities/user.entity";
import AppError from "../errors/appError";
import { SessionCreate, SessionReturn } from "../interface/session.interfece";
import { userReturnSchema } from "../schemas/user.schemas";

export class SessionServices {
  static async login({
    email,
    password,
  }: SessionCreate): Promise<SessionReturn> {
    const userRepository = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOneBy({ email });

    if (!user) throw new AppError("Email or password invalid", 403);

    const passwordMatch: boolean = await compare(password, user.password);

    if (user.password !== password)
      throw new AppError("Invalid credentials", 401);

    const token: string = jwt.sign({}, process.env.SECRET_KEY!, {
      subject: user.id.toString(),
      expiresIn: "72h",
    });
    const userReturn = userReturnSchema.parse(user);

    return { token, userReturn };
  }
}
