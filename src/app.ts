import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import { sessionRoutes } from "./routes/session.routes";
import { postRoutes } from "./routes/post.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/session", sessionRoutes);
app.use("/users", userRoutes);
app.use("/post", postRoutes);

export default app;
