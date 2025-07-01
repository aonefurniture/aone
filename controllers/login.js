import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res, next) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;
    if (email !== process.env.EMAIL_ID)
      return next(createError(404, "User not found!"));

    if (password !== process.env.PASSWORD)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { email: email, password: password },
      process.env.JWT
    );

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      })
      .json({ isAdmin: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const logoutAdmin = async (req, res, next) => {
  try {
    await res
      .cookie("access_token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loadAdmin = async (req, res) => {
  try {
    const email = req.email;
    const password = req.password;

    if (email == process.env.EMAIL_ID && password == process.env.PASSWORD) {
      res.status(200).json({
        success: true,
        message: "load admin successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
