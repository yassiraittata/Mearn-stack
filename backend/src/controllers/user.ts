import express from "express";
import argon from "argon2";
import { validationResult } from "express-validator";
import createError from "http-errors";

import userModel from "../models/user.ts";
import { generateToken } from "../utils/inex.ts";

const signup: express.RequestHandler = async (req, res, next) => {
  // validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400, "All feilds are required and must be valid"));
  }

  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(createError(400, "User already exists"));
  }
  // create user
  const hash = await argon.hash(password);

  const user = await userModel.create({ name, email, password: hash });

  if (!user) {
    return next(createError(500, "Failed to create user"));
  }

  const { token, user: userObject } = generateToken(user);

  res.status(201).json({ user: userObject, token });
};

const signin: express.RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400, "All feilds are required and must be valid"));
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(createError(400, "Invalid credentials"));
  }

  const isPasswordValid = await argon.verify(user.password, password);

  if (!isPasswordValid) {
    return next(createError(400, "Invalid password"));
  }

  const { token, user: userObject } = generateToken(user);

  res.status(201).json({ user: userObject, token });
};

export { signup, signin };
