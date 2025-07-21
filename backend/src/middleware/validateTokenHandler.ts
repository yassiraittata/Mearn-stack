import express from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";

const validateToken: express.RequestHandler = async (req, res, next) => {
  let token: string | undefined;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (
    authHeader &&
    typeof authHeader === "string" &&
    authHeader?.startsWith("Bearer")
  ) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(createError(401, "User is not authorized"));
      }
      req.user = decoded;
      next();
    });

    if (!token) {
      return next(
        createError(401, "User is not authorized or token is missing")
      );
    }
  } else {
    return next(createError(401, "User is not authorized or token is missing"));
  }
};

export default validateToken;
