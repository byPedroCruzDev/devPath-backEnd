import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import { Middleware } from "../middlewares/middlewares";

export const userRoutes = Router();

userRoutes.get("", Middleware.Auth, UsersController.listAll);
userRoutes.get("/:id", Middleware.Auth, UsersController.listOne);
userRoutes.patch(
  "/:id",
  Middleware.Auth,
  Middleware.isOwner,

  UsersController.update
);
userRoutes.delete(
  "/:id",
  Middleware.Auth,
  Middleware.isOwner,
  UsersController.delete
);
