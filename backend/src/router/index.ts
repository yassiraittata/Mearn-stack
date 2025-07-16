import express from "express";

import noteRouter from "./notes.ts";

const router = express.Router();

export default (): express.Router => {
  noteRouter(router);

  return router;
};
