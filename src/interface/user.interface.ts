import { User } from "../entities/user.entity";

export interface IUser {
  id: string;
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  image: string;
  occupation: string;
  isAdm: boolean;
}
