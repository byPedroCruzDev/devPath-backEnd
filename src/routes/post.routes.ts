import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { Middleware } from "../middlewares/middlewares";

export const postRoutes = Router();

postRoutes.post("", Middleware.Auth, PostController.create);
postRoutes.get("", PostController.listAll);
postRoutes.get("/:id", PostController.listOne);
postRoutes.delete("", PostController.delete);
postRoutes.patch("", PostController.update);
