import express from "express";
import validateToken from "../middleware/validateTokenHandler.ts";
import { body } from "express-validator";

import {
  getTasksForProject,
  createTaskForProject,
  deleteTask,
  updateTask,
} from "../controllers/task.ts";

export default (router: express.Router) => {
  router.get("/projects/:projectId/tasks", validateToken, getTasksForProject);
  router.post(
    "/projects/:projectId/tasks",
    validateToken,
    createTaskForProject
  );
  router.delete("/tasks/:taskId", validateToken, deleteTask);
  router.put(
    "/tasks/:taskId",
    [
      body("status")
        .optional()
        .isIn(["todo", "in-progress", "done"])
        .withMessage("Status must be one of: todo, in-progress, done"),
    ],
    validateToken,
    updateTask
  );
  // router.put("/projects/remove/:id", validateToken, removeUsersFromProject);
};
