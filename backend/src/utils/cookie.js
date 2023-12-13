const clearAndMakeCookie = (res, cookieName, token) => {
  return new Promise((resolve, reject) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    try {
      res.clearCookie(cookieName, {
        domain: "https://fizzays-mern-estae.onrender.com/",
        httpOnly: true,
        signed: true,
      });
      res.cookie(process.env.COOKIE_NAME, token, {
        domain: "https://fizzays-mern-estae.onrender.com/",
        expires: expires,
        httpOnly: true,
        signed: true,
      });
      resolve();
    } catch (e) {
      reject();
      console.log(e);
    }
  });
};

module.exports = { clearAndMakeCookie };
