import express from "express";
import validateToken from "../middleware/validateTokenHandler.ts";
import { getTasksProject } from "../controllers/task.ts";

export default (router: express.Router) => {
  router.get("/projects/:projectId", validateToken, getTasksProject);
  router.post("/projects/create", validateToken, createProject);
  router.delete("/projects/:id", validateToken, deleteProject);
  router.put("/projects/assign/:id", validateToken, assignUsersToProject);
  router.put("/projects/remove/:id", validateToken, removeUsersFromProject);
};
