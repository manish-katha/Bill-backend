import express from "express";
import {
  getAllusers,
  register,
  login,
  getmyProfile,
  logout,
} from "../controllers/user.js";
import { isAuthenticate } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/all", getAllusers);

userRouter.post("/new", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

userRouter.get("/me", isAuthenticate, getmyProfile);

export default userRouter;
