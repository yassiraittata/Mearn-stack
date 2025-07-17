import express from "express";
import bodyParser from "body-parser";
import router from "./router/index.ts";
import errorHandler from "./middleware/errorHandler.ts";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(router());

app.use((req, res, next) => {
  res.status(404);
  next(Error("Endpoint not Found!"));
});

app.use(errorHandler);

export default app;
