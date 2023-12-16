const express = require("express");
const {
  signUpUser,
  googleLogin,
  loginUser,
} = require("../controllers/userController");

const userRouter = express.Router();

// userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(signUpUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/google-auth").post(googleLogin);

module.exports = userRouter;
