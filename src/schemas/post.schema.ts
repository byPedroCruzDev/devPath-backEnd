import { z } from "zod";
import { userReturnSchema, userSchema } from "./user.schemas";

const postSchema = z.object({
  id: z.number().positive(),
  content: z.string(),
  creationDate: z.date(),
  author: userReturnSchema,
  like: z.array(
    z.object({
      post: z.array(z.object({})),
      id: z.number(),
      user: userSchema,
    })
  ),
  comments: z.array(
    z.object({
      content: z.string(),
      id: z.number(),
      like: z.number(),
    })
  ),
});

const postSchemaReturn = postSchema;
const postSchemaArray = z.array(postSchemaReturn);

export { postSchema, postSchemaReturn, postSchemaArray };
