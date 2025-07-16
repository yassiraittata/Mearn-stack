import express from "express";
import asyncHandler from "express-async-handler";

import Note from "../models/note.ts";

const getAllNotes = asyncHandler(
  async (req: Express.Request, res: express.Response) => {
    res.status(400);
    throw new Error("All fields are mandatory!");
    const notes = await Note.find().exec();
    res.status(200).json(notes);
  }
);

export { getAllNotes };
