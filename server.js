import express from "express";
import ViteExpress from "vite-express";
import authRouter from "./server/routers/authRouter.js";
import session from "express-session";

const oneDay = 1000 * 60 * 60 * 24;
const app = express();

app.set("trust proxy", 1);
app.use(
  session({
    name: "weather app",
    secret: "some-secret-key-from-env",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: oneDay,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded());

app.use(authRouter);
ViteExpress.listen(app, 3000);
