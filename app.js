import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";


export const app = express();

config({ path: "./data/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:  [process.env.FRONTEND_URL],
    credentials: true,
  })
);

console.log(process.env.PORT);
console.log(process.env.FRONTEND_URL);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorMiddleware);
