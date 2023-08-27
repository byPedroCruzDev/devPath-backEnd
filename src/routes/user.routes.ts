import { Router } from "express";
import { UsersController } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.post("", UsersController.create);
userRoutes.get("", UsersController.listAll);
userRoutes.get("/:id", UsersController.listOne);
userRoutes.delete("", UsersController.delete);
userRoutes.patch("", UsersController.update);
