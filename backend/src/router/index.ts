import express from "express";

import noteRouter from "./notes.ts";
import userRouter from "./users.ts";
import projectRouter from "./projects.ts";
import taskRouter from "./tasks.ts";

const router = express.Router();

export default (): express.Router => {
  noteRouter(router);
  userRouter(router);
  projectRouter(router);
  taskRouter(router);

  return router;
};
