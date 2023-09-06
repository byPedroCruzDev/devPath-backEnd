import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import { Middleware } from "../middlewares/middlewares";

export const userRoutes = Router();

userRoutes.post("", Middleware.UniqueEmail, UsersController.create);
userRoutes.get("", Middleware.Auth, UsersController.listAll);
userRoutes.get("/:id", UsersController.listOne);
userRoutes.delete(":/id", UsersController.delete);
userRoutes.patch("/:id", UsersController.update);
