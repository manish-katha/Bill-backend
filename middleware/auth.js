import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticate = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("this is token",token);

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login first",
    });

  const decoded = jwt.verify(token, process.env.JWt_SECRET);

  req.user = await User.findById(decoded._id);
  console.log("this is user",req.user);
  next();
};
