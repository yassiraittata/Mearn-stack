import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import projectModel from "../models/project.ts";
import taskModel from "../models/task.ts";

// get all tasks that are part of a project
const getTasksForProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user?.id;
  
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400);
    return next(Error("Invalid ID format"));
  }

  const project = await projectModel.findById(projectId).populate("tasks");

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  if (
    project.creator.toString() !== userId &&
    !project.developers.includes(userId)
  ) {
    res.status(403);
    return next(Error("You are not authorized to view this project"));
  }

  res.status(200).json(project);
};

// create a new task for a project
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
    res.status(400);
    return next(Error("Invalid task ID format"));
  }

  const task = await taskModel.findById(taskId);

  const project = await projectModel.findById(task?.project);

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  if (project.creator.toString() !== userId) {
    res.status(403);
    return next(Error("You are not authorized to delete this task"));
  }

  if (!task) {
    res.status(404);
    return next(Error("Task not found"));
  }

  await task.deleteOne();

  project.tasks = project.tasks.filter((t) => t.toString() !== taskId);
  await project.save();

  res.status(200).json({ message: "Task deleted successfully" });
};

// update a task
const updateTask: express.RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400);
    return next(Error("Invalid task ID format"));
  }

  const { title, text, status, developer } = req.body;
  const taskItem = await taskModel.findById(taskId);

  if (!taskItem) {
    res.status(404);
    return next(Error("Task not found"));
  }

  const project = await projectModel.findById(taskItem.project);

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  // Upate task only if the user is the creator of the project or a developer in the project
  if (
    !project.developers.includes(userId) &&
    project.creator.toString() !== userId
  ) {
    res.status(400);
    return next(Error("You are not authorized to update this task"));
  }

  // validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(
      Error(
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

  res.status(200).json(taskItem);
};

export { getTasksForProject, createTaskForProject, deleteTask, updateTask };
