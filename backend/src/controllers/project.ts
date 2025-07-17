import express from "express";
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

export { createProject };
