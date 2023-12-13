const { clearAndMakeCookie } = require("../utils/cookie");
const errorHandler = require("../utils/customError");
const {
  encryptPassword,
  generateSignature,
  checkPassword,
} = require("../utils/passwordUtils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signUpUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    email.trim() == "" ||
    username.trim() == "" ||
    password.trim() == ""
  ) {
    return next(errorHandler(404, "provide name email and password"));
  }
  try {
    const exisitingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (exisitingUser) {
      return next(errorHandler(400, "user with email already exists"));
    }

    const encryptedPassword = await encryptPassword(password);
    console.log(encryptedPassword);
    const user = await prisma.user.create({
      data: { username, email, password: encryptedPassword },
    });
    const token = generateSignature({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    console.log(user);
    // removing the password before sending remainign to the frontend
    const { password: remPassword, ...rest } = user;

    await clearAndMakeCookie(res, process.env.COOKIE_NAME, token);
    return res.status(201).json({
      message: "USER CREATED",
      user: rest,
    });
  } catch (e) {
    next(e);
  }
};

const googleLogin = async (req, res, next) => {
  const { email, image } = req.body;
  if (!email) {
    return next(errorHandler(404, "you must provide email "));
  }
  // try {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    const generateRandomPassword = (length) =>
      Array.from(
        { length },
        () =>
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
            Math.floor(Math.random() * 62)
          ]
      ).join("");
    const randompassword = generateRandomPassword(12);
    const hashedPassword = await encryptPassword(randompassword);

    const username = email.split("@")[0];

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        image: image.trim(),
        password: hashedPassword,
      },
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application
    const token = generateSignature({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
    await clearAndMakeCookie(res, process.env.COOKIE_NAME, token);

    const { password: password, ...rest } = newUser;
    return res.status(201).json({ message: "user created", user: rest });
  } else {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application
    const token = generateSignature({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    await clearAndMakeCookie(res, process.env.COOKIE_NAME, token);
    const { password: password, ...rest } = user;
    return res.status(200).json({ message: "logged in", user: rest });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password.trim() == "" || email.trim == "") {
    next(errorHandler(404, "you must provide email or password"));
  }

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return next(
      errorHandler(404, "wrong email or password please check and try again")
    );
  }

  const correctPassword = await checkPassword(password, user.password);

  if (correctPassword) {
    const token = generateSignature({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    await clearAndMakeCookie(res, process.env.COOKIE_NAME, token);
    const { password: password, ...rest } = user;

    return res.status(200).json({
      message: "LOGGED IN SUCCESSFULLY",
      user: rest,
    });
  } else {
    next(
      errorHandler(404, "wrong email or password please check and try again")
    );
  }
};

module.exports = { signUpUser, googleLogin, loginUser };
