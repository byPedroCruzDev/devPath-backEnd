import { Router } from "express";
import { SessionControllers } from "../controllers/session.controller";
import { Middleware } from "../middlewares/middlewares";

export const sessionRoutes = Router();

sessionRoutes.post("", SessionControllers.login);
