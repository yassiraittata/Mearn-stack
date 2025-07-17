import express from "express";
import { body } from "express-validator";
import validateToken from "../middleware/validateTokenHandler.ts";

export default (router: express.Router) => {
  router.post("/projects/create", validateToken, (req, res) => {
    res.json({ message: "Project created" });
  });
};
