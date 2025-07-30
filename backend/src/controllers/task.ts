import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import createError from "http-errors";

import projectModel from "../models/project.ts";
import taskModel from "../models/task.ts";

// get all tasks that are part of a project
const getTasksForProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid ID format"));
  }

  const project = await projectModel
    .findById(projectId)
    .populate("developers")
    .populate({
      path: "tasks",
      populate: {
        path: "developer",
        model: "User",
      },
    });

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  console.log({
    project,
    userId,
  });

  if (
    project.creator.toString() !== userId &&
    !project.developers.some((devId) => devId.equals(userId))
  ) {
    return next(
      createError(403, "You are not authorized to view this project")
    );
  }

  res.status(200).json(project);
};

// create a new task for a project
const createTaskForProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid project ID format"));
  }

  const { title, text, status, developer } = req.body;

  const errors = validationResult(req);

  // validate data
  if (!errors.isEmpty()) {
    return next(createError(400, "All fields are required and must be valid"));
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  if (project.creator.toString() !== userId) {
    return next(
      createError(
        403,
        "You are not authorized to create tasks for this project"
      )
    );
  }

  const developersArr = project.developers.map((dev) => dev.toString());

  if (developer && !developersArr.includes(developer) && developer !== userId) {
    // check if developer is part of the project or he is the creator
    return next(createError(400, "Developer is not part of the project"));
  }

  const task = await taskModel.create({
    title,
    text,
    status,
    developer,
    project: projectId,
  });

  project.tasks.push(task.id);
  await project.save();

  res.status(201).json(task);
};

// delete a task
const deleteTask: express.RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(createError(400, "Invalid task ID format"));
  }

  const task = await taskModel.findById(taskId);

  const project = await projectModel.findById(task?.project);

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  if (project.creator.toString() !== userId) {
    return next(createError(403, "You are not authorized to delete this task"));
  }

  if (!task) {
    return next(createError(404, "Task not found"));
  }

  await task.deleteOne();

  project.tasks = project.tasks.filter((t) => t.toString() !== taskId);
  await project.save();

  res.status(204).json({ message: "Task deleted successfully" });
};

// update a task
const updateTask: express.RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(createError(400, "Invalid task ID format"));
  }

  const { title, text, status, developer } = req.body;
  const taskItem = await taskModel.findById(taskId);

  if (!taskItem) {
    return next(createError(404, "Task not found"));
  }

  const project = await projectModel.findById(taskItem.project);

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  // Upate task only if the user is the creator of the project or a developer in the project
  if (
    !project.developers.includes(userId) &&
    project.creator.toString() !== userId
  ) {
    return next(createError(403, "You are not authorized to update this task"));
  }

  // validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      createError(
        400,
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      )
    );
  }

  if (
    project.creator.toString() !== userId &&
    project.developers.includes(userId)
  ) {
    // if the user is a developer, he can only update the status of the task
    taskItem.status = status || taskItem.status;
  } else {
    // if the user is the creator, he can update all fields
    taskItem.title = title || taskItem.title;
    taskItem.text = text || taskItem.text;
    taskItem.status = status || taskItem.status;
    taskItem.developer = developer || taskItem.developer;
  }

  await taskItem.save();

  const task = await taskItem.populate("developer");

  res.status(200).json(task);
};

export { getTasksForProject, createTaskForProject, deleteTask, updateTask };
