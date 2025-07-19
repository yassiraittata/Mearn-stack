import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import projectModel from "../models/project.ts";

// get all tasks that are part of a project
const getTasksForProject: express.RequestHandler = async (req, res, next) => {
  const userId = req.user.id;

  const projectId = req.params.projectId;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400);
    return next(Error("Invalid ID format"));
  }

  const project = await projectModel.findById(projectId).populate("tasks");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
};
