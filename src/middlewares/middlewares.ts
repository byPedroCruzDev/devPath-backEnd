import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";
import { verify } from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export class Middleware {
  static Auth(req: Request, res: Response, next: NextFunction): void {
    let authorization: string | undefined = req.headers.authorization;

    console.log(authorization);

    if (!authorization) throw new AppError("Invalid token", 401);

    const [bearer, token]: Array<string> = authorization.split(" ");

    res.locals = {
      ...res.locals,
      decoded: verify(token, process.env.SECRET_KEY!),
    };
    return next();
  }

  static async UniqueEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const email: string = req.body.email;

    if (!email) return next();
    const userRepository = AppDataSource.getRepository(User);

    const foundEntity: User | null = await userRepository.findOneBy({ email });

    if (foundEntity) throw new AppError("Email already exists", 409);

    return next();
  }
}
