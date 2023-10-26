import { z } from "zod";
import { userReturnSchema } from "./user.schemas";
import { postSchema } from "./post.schema";

const likeSchema = z.object({
  id: z.string(),
  user: userReturnSchema,
  post: postSchema,
});

const createLike = likeSchema.omit({ post: true });

export { likeSchema, createLike };
