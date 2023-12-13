const express = require("express");
const errorHandlerMiddleWare = require("./middlewares/errorHandler");
const { userRouter } = require("./routes/UserRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigin = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1/user", userRouter);

app.use(errorHandlerMiddleWare);

app.listen(process.env.PORT, () => {
  console.log("running on port 8080");
});
