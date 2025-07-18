import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import projectModel from "../models/project.ts";

const createProject: express.RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(Error("All fields are required and must be valid"));
  }
  const { title } = req.body;

  const creator = req.user.id;

  const developers = req.body.developers || [];

  const project = await projectModel.create({
    title,
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
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  if (project.creator.toString() !== req.user.id) {
    res.status(403);
    return next(Error("You do not have permission to delete this project"));
  }

  await project.deleteOne();

  res.status(200).json({
    message: "Project deleted successfully",
  });
};

const assignUsersToProject: express.RequestHandler = async (req, res, next) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  if (project.creator.toString() !== req.user.id) {
    res.status(403);
    return next(Error("You do not have permission to update this project"));
  }

  const { developers } = req.body;

  project.developers = [...project.developers, ...developers];
  await project.save();
  res.status(200).json({
    message: "Users assigned to project successfully",
    project,
  });
};

const eremoveUsersFromProject: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const project = await projectModel.findById(projectId);

  if (!project) {
    res.status(404);
    return next(Error("Project not found"));
  }

  if (project.creator.toString() !== req.user.id) {
    res.status(403);
    return next(Error("You do not have permission to update this project"));
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

export {
  createProject,
  deleteProject,
  assignUsersToProject,
  eremoveUsersFromProject,
};
