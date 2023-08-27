import { Request, Response } from "express";
import { SessionServices } from "../services/session.services";

export class SessionControllers {
  static async login(req: Request, res: Response) {
    const userData: any = req.body;
    const response = await SessionServices.login(userData);

    return res.json(response);
  }
}
