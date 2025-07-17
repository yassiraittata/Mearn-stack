import express from "express";
import jwt from "jsonwebtoken";

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
        res.status(401);
        return next(Error("User is not authorized"));
      }
      req.user = decoded;
      next();
    });

    if (!token) {
      res.status(401);
      return next(Error("User is not authorized or token is missing"));
    }
  } else {
    res.status(401);
    return next(Error("User is not authorized or token is missing"));
  }
};

export default validateToken;
