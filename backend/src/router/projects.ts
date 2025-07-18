import express from "express";
import validateToken from "../middleware/validateTokenHandler.ts";
import {
  createProject,
  deleteProject,
  assignUsersToProject,
  eremoveUsersFromProject,
} from "../controllers/project.ts";

export default (router: express.Router) => {
  router.post("/projects/create", validateToken, createProject);
  router.delete("/projects/:id", validateToken, deleteProject);
  router.put("/projects/assign/:id", validateToken, assignUsersToProject);
  router.put("/projects/remove/:id", validateToken, eremoveUsersFromProject);
};
