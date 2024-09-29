import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, status = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWt_SECRET);
  console.log("token generated", token);


   res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
  // console.log("message",message)
};
