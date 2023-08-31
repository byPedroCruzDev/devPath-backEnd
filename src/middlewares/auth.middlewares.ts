import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";

export class Middleware {
  static async Auth(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    console.log(token);

    if (!token) {
      throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }
      req.user = {
        id: decoded.sub,
      };
      return next();
    });
  }
}
