import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";
import { verify } from "jsonwebtoken";

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
}
