import express from "express";
import { body } from "express-validator";
import validateToken from "../middleware/validateTokenHandler.ts";
import { createProject } from "../controllers/project.ts";

export default (router: express.Router) => {
  router.post("/projects/create", validateToken, createProject);
};
