import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import { Middleware } from "../middlewares/middlewares";

export const userRoutes = Router();

userRoutes.post("", Middleware.UniqueEmail, UsersController.create);
<<<<<<< Updated upstream
userRoutes.get("", Middleware.Auth, Middleware.IsAdm, UsersController.listAll);
userRoutes.get("/:id", UsersController.listOne);
userRoutes.delete("", UsersController.delete);
userRoutes.patch("", UsersController.update);
=======
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
>>>>>>> Stashed changes
