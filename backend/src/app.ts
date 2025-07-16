import express from "express";
import bodyParser from "body-parser";
import router from "./router/index.ts";
import errorHandler from "./middleware/errorHandler.ts";

const app = express();

app.use(bodyParser.json());

app.use(router());
app.use(errorHandler);

export default app;
