import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import createError from "http-errors";

import projectModel from "../models/project.ts";

const createProject: express.RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400, "All fields are required and must be valid"));
  }
  const { title, description } = req.body;

  const creator = req.user.id;

  const developers = req.body.developers || [];

  const project = await projectModel.create({
    title,
    description,
    creator,
    developers,
  });

  res.status(201).json({
    message: "Project created successfully",
    project,
  });
};

const deleteProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid ID format"));
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  if (project.creator.toString() !== req.user.id) {
    return next(
      createError(403, "You do not have permission to delete this project")
    );
  }

  await project.deleteOne();

  // res.status(204).json({
  //   message: "Project deleted successfully",
  // });

  res.sendStatus(204); // No Content response
};

const assignUsersToProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid ID format"));
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  if (project.creator.toString() !== req.user.id) {
    return next(
      createError(403, "You do not have permission to update this project")
    );
  }

  const { developers } = req.body;

  project.developers = [...project.developers, ...developers];
  await project.save();
  res.status(200).json({
    message: "Users assigned to project successfully",
    project,
  });
};

const removeUsersFromProject: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid ID format"));
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    return next(createError(404, "Project not found"));
  }

  if (project.creator.toString() !== req.user.id) {
    return next(
      createError(403, "You do not have permission to update this project")
    );
  }

  project.developers = project.developers.filter(
    (dev) => !req.body.developers.includes(dev.toString())
  );

  await project.save();
  res.status(200).json({
    message: "Users was removed from the project successfully",
    project,
  });
};

// get all projects that a user is a part of
const getUserProjects: express.RequestHandler = async (req, res, next) => {
  const userId = req.user.id;

  const projects = await projectModel.find({
    $or: [{ creator: userId }, { developers: userId }],
  });

  res.status(200).json(projects);
};

export {
  createProject,
  deleteProject,
  assignUsersToProject,
  removeUsersFromProject,
  getUserProjects,
};
