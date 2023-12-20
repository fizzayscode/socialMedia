const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const errorHandler = require("../utils/customError");

const getAllPins = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: res.locals.jwtData.id },
    });
    if (!user) {
      return next(
        errorHandler(404, "user couldnt be found please login again")
      );
    }
    const pins = await prisma.pin.findMany({});
    console.log(pins);
    return res.status(200).json({ message: "All pins Found", pins: pins });
  } catch (e) {
    next(e);
  }
};

const getPinsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: res.locals.jwtData.id },
    });
    if (!user) {
      return next(
        errorHandler(404, "user couldnt be found please login again")
      );
    }
    const pins = await prisma.pin.findMany({ where: { category: categoryId } });
    console.log(pins);
    return res.status(200).json({ message: "All pins Found", pins: pins });
  } catch (e) {
    next(e);
  }
};

const getPin = (req, res) => {};

const createPin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: res.locals.jwtData.id },
    });

    if (!user) {
      return next(
        errorHandler(404, "user couldnt be found please login again")
      );
    }
    const { title, about, destination, category, image } = req.body;

    const pin = await prisma.pin.create({
      data: {
        title,
        about,
        destination,
        category,
        image,
        postedBy: { connect: { id: user.id } },
      },
    });
    console.log(pin);

    if (!pin) {
      return next(errorHandler(500, "something went wrong in creating"));
    }
    return res.status(201).json({ message: "Pin Created", pin });
  } catch (e) {
    next(e);
  }
};

module.exports = { getAllPins, getPin, getPinsByCategory, createPin };
