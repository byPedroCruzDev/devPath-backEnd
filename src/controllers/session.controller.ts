import { Request, Response } from "express";
import { SessionServices } from "../services/session.service";
import { SessionReturn } from "../interface/session.interfece";

export class SessionControllers {
  static async login(req: Request, res: Response): Promise<Response> {
    const token: SessionReturn = await SessionServices.login(req.body);

    return res.json(token);
  }
}
