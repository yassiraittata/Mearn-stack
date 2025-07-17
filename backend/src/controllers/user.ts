import express from "express";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import userModel from "../models/user.ts";

const signup: express.RequestHandler = async (req, res, next) => {
  // validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(Error("All feilds are required and must be valid"));
  }

  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    return next(Error("User already exists"));
  }
  // create user
  const hash = await argon.hash(password);

  const user = await userModel.create({ name, email, password: hash });

  if (!user) {
    res.status(500);
    return next(Error("Failed to create user"));
  }

  //  create token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.status(201).json({ user, token });
};

const signin: express.RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({ name, email, password });
  res.status(201).json(user);
};

export { signup, signin };
