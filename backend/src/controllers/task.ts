import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import projectModel from "../models/project.ts";
import taskModel from "../models/task.ts";

// get all tasks that are part of a project
const getTasksForProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.projectId;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400);
    return next(Error("Invalid ID format"));
  }

  const project = await projectModel.findById(projectId).populate("tasks");

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  res.status(200).json(project);
};

const createTaskForProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400);
    return next(Error("Invalid project ID format"));
  }

  const { title, text, status, developer } = req.body;

  const errors = validationResult(req);

  // validate data
  if (!errors.isEmpty()) {
    res.status(400);
    return next(Error("All fields are required and must be valid"));
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  if (project.creator.toString() !== userId) {
    res.status(403);
    return next(
      Error("You are not authorized to create tasks for this project")
    );
  }

  const developersArr = project.developers.map((dev) => dev.toString());

  if (developer && !developersArr.includes(developer) && developer !== userId) {
    // check if developer is part of the project or he is the creator
    res.status(400);
    return next(Error("Developer is not part of the project"));
  }

  const task = await taskModel.create({
    title,
    text,
    status,
    developer,
  });

  project.tasks.push(task.id);
  await project.save();

  res.status(201).json(task);
};

export { getTasksForProject, createTaskForProject };
