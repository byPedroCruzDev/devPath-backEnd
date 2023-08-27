import { Router } from "express";
import { SessionControllers } from "../controllers/session.controller";

export const sessionRoutes = Router();

sessionRoutes.post("", SessionControllers.login);
