const express = require("express");
const appRouter = express.Router();

const pinRouter = require("./PinsRouter");
const userRouter = require("./UserRouter");

appRouter.use("/users", userRouter);
appRouter.use("/pins", pinRouter);

module.exports = appRouter;
