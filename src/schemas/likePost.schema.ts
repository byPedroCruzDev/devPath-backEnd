import { z } from "zod";
import { userReturnSchema } from "./user.schemas";
import { postSchema } from "./post.schema";

const likeSchema = z.array(
  z.object({
    id: z.string(),
    user: userReturnSchema,
  })
);

const likeArray = z.array(likeSchema);

export { likeSchema, likeArray };
