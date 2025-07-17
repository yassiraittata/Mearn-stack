import express from "express";
import validateToken from "../middleware/validateTokenHandler.ts";
import { createProject, deleteProject } from "../controllers/project.ts";

export default (router: express.Router) => {
  router.post("/projects/create", validateToken, createProject);
  router.delete("/projects/:id", validateToken, deleteProject);
};
