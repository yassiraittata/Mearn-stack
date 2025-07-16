import express from "express";
import Note from "../models/note.ts";

export async function getAllNotes(req: Express.Request, res: express.Response) {
  try {
    const notes = await Note.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
}
