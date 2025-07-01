import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;

    if (!access_token) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    const decoded = await jwt.verify(access_token, process.env.JWT);

    req.email = decoded.email;
    req.password = decoded.password;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
