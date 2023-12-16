require("dotenv").config();
const clearAndMakeCookie = (res, cookieName, token) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return new Promise((resolve, reject) => {
    try {
      res.clearCookie(cookieName, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });
      res.cookie(process.env.COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires: expires,
        httpOnly: true,
        signed: true,
      });
      console.log(res);
      resolve();
    } catch (e) {
      reject();
      console.log(e);
    }
  });
};

module.exports = { clearAndMakeCookie };
