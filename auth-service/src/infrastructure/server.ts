import express, { Request, Response } from "express";
import user_routes from "../app/routes";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["*"],
    methodes: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

user_routes(app);

export default app;
