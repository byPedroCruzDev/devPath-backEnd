import { z } from "zod";
import { Post } from "../entities/post.entity";
import {
  createPostSchema,
  postSchema,
  postSchemaArray,
  postSchemaReturn,
} from "../schemas/post.schema";
import { Repository } from "typeorm";

type PostCreate = z.infer<typeof createPostSchema>;
type PostArrayReturn = z.infer<typeof postSchemaArray>;
type PostReturn = z.infer<typeof postSchemaReturn>;

type PostRepository = Repository<Post>;

export { PostArrayReturn, PostCreate, PostReturn, PostRepository };
