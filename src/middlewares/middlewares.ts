import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";
import { verify } from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/post.entity";
import { Like } from "../entities/like.emtity";

export class Middleware {
  static Auth(req: Request, res: Response, next: NextFunction): void {
    let authorization: string | undefined = req.headers.authorization;

    if (!authorization) throw new AppError("Invalid token", 401);
    console.log("here");

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

  static IsAdm(req: Request, res: Response, next: NextFunction): void {
    const adm: boolean = res.locals.decoded.isAdm;

    if (!adm) throw new AppError("Insufficient permissions", 403);

    return next();
  }
  static async isOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);

    const user: User | any = await userRepository.findOneBy({
      id: req.params.id,
    });
    const userTokenId = res.locals.decoded.sub;

    console.log(user.id, userTokenId);
    if (user.id !== userTokenId) {
      throw new AppError("You can not do that because you not a owner", 401);
    }

    return next();
  }
  static async isOwnerPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const postRepository = AppDataSource.getRepository(Post);
    const id = parseInt(req.params.id);
    const post: any = await postRepository.findOne({
      where: { id: id },
      relations: { author: true },
    });
    const userTokenId = res.locals.decoded.sub;
    if (post?.author.id !== userTokenId) {
      throw new AppError("You can not do that because you not a owner", 401);
    }

    return next();
  }
  static async isOwnerLike(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const likeRepository = AppDataSource.getRepository(Like);

    const userTokenId = res.locals.decoded.sub;

    const postId: any = req.params.postId;
    const likeId: any = req.params.likeId;

    const like: any = await likeRepository.findOne({
      where: { post: { id: postId }, id: likeId },
      relations: ["user"],
    });

    if (like?.user.id !== userTokenId) {
      throw new AppError("You can not do that because you not a owner", 401);
    }

    return next();
  }
}
