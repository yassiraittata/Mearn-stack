import express from "express";

import Note from "../models/note.ts";

const getAllNotes = async (req: Express.Request, res: express.Response) => {

  const notes = await Note.find().exec();
  res.status(200).json(notes);
};

export { getAllNotes };
