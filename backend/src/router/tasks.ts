import express from "express";
import validateToken from "../middleware/validateTokenHandler.ts";
import {
  getTasksForProject,
  createTaskForProject,
  deleteTask,
} from "../controllers/task.ts";

export default (router: express.Router) => {
  router.get("/projects/:projectId/tasks", validateToken, getTasksForProject);
  router.post(
    "/projects/:projectId/tasks",
    validateToken,
    createTaskForProject
  );
  router.delete("/tasks/:taskId", validateToken, deleteTask);
  // router.put("/projects/assign/:id", validateToken, assignUsersToProject);
  // router.put("/projects/remove/:id", validateToken, removeUsersFromProject);
};
