import { User } from "../entities/user.entity";
import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
} from "../schemas/user.schemas";
import { DeepPartial, Repository } from "typeorm";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserUpdate = DeepPartial<User>;

type UserRepository = Repository<User>;

export { UserCreate, UserRead, UserReturn, UserUpdate, UserRepository };
