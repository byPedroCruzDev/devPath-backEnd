import { Router } from "express";
import { PostController } from "../controllers/post.controller";

export const postRoutes = Router();

postRoutes.post("", PostController.create);
postRoutes.get("", PostController.listAll);
postRoutes.get("/:id", PostController.listOne);
postRoutes.delete("", PostController.delete);
postRoutes.patch("", PostController.update);
