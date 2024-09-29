import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { sendcookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

export const getAllusers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password +name");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Invalid id or Password", 400));

    console.log("user anem",user.name);
    
    sendcookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = await req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already Exist", 400));

    const hashedPassword = await bcryptjs.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendcookie(user, res, "registered succesfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getmyProfile = (req, res) => {
  if (req.user)
    return res.status(200).json({
      success: true,
      user: req.user,
    });
};

export const logout = (req, res) => {
 res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
