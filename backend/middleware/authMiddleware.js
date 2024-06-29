const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("Token extracted:", token);

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findOne({ _id: decode.id }).select("-password");
      //   req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    console.warn(
      "Authorization header not found or does not start with 'Bearer'"
    );
    res.status(401).json({ message: "Not authorized" });
  }
});

module.exports = { protect };
