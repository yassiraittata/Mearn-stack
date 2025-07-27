import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import createError from "http-errors";

import router from "./router/index.ts";
import errorHandler from "./middleware/errorHandler.ts";

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(router());

app.use((req, res, next) => {
  return next(createError(404, "Endpoint not Found!"));
});

app.use(errorHandler);

export default app;
