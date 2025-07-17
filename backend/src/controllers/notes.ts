import express from "express";

import Note from "../models/note.ts";

const getAllNotes: express.RequestHandler = async (req, res) => {
  const notes = await Note.find().exec();
  res.status(200).json(notes);
};

export { getAllNotes };
