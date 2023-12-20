const express = require("express");
const {
  getAllPins,
  getPinsByCategory,
  getPin,
  createPin,
} = require("../controllers/PinsController");
const { verifyToken } = require("../middlewares/VerifyToken");

const PinRouter = express.Router();

// userRouter.route("/login").post(loginUser);
PinRouter.route("/").get(verifyToken, getAllPins).post(verifyToken, createPin);
PinRouter.route("/ByCategory/:categoryId").get(verifyToken, getPinsByCategory);
PinRouter.route("/:id").get(verifyToken, getPin);

module.exports = PinRouter;
