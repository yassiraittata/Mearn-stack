import express from "express";

import { getAllNotes } from "../controllers/notes.ts";

export default (router: express.Router) => {
  router.get("/", getAllNotes);
};
