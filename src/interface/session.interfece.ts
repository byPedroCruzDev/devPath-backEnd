import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";
import { UserReturn } from "./user.interface";
import { userReturnSchema } from "../schemas/user.schemas";
type SessionCreate = z.infer<typeof sessionSchema>;
type SessionReturn = { token: string; user: UserReturn };

export { SessionCreate, SessionReturn };
