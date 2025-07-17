import express from "express";
import { body } from "express-validator";

import { signup, signin } from "../controllers/user.ts";

export default (router: express.Router) => {
  router.post(
    "/auth/signup",
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Valid email is required"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    signup
  );
  router.post(
    "/auth/signin",
    [
      body("email").isEmail().withMessage("Valid email is required"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    signin
  );
};
