import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { Middleware } from "../middlewares/middlewares";

export const postRoutes = Router();

postRoutes.post("", Middleware.Auth, PostController.create);
postRoutes.get("", Middleware.Auth, PostController.listAll);
postRoutes.get("/:id", Middleware.Auth, PostController.listOne);
postRoutes.delete(
  "/:id",
  Middleware.Auth,
  Middleware.isOwnerPost,
  PostController.delete
);
postRoutes.patch(
  "/:id",
  Middleware.Auth,
  Middleware.isOwnerPost,
  PostController.update
);
