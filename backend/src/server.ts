import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
