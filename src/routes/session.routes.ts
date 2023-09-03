import { Router } from "express";
import { SessionControllers } from "../controllers/session.controller";
import { Middleware } from "../middlewares/auth.middlewares";

export const sessionRoutes = Router();

sessionRoutes.post("", SessionControllers.login);
