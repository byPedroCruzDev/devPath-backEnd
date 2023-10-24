import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  password: z.string().max(150),
  email: z.string().max(150),
  image: z.string(),
  occupation: z.string().max(25),
  isAdmin: z.boolean().default(false),
});

const userCreateSchema = userSchema.omit({
  id: true,
  image: true,
});

const userReturnSchema = userSchema.omit({
  password: true,
  confirmPassword: true,
});
const userReadSchema = userReturnSchema;
const userReadSchemaArray = z.array(userReturnSchema);
const userUpdateSchema = userCreateSchema.omit({ isAdmin: true }).partial();

export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
  userReadSchemaArray,
};
