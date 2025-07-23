import jwt from "jsonwebtoken";
import userModel from "../models/user.ts";

type User = typeof userModel extends { new (...args: any[]): infer U }
  ? U
  : never;

export function generateToken(user: User) {
  // create token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "15d" }
  );

  const userObject = user.toObject() as Record<string, any>;
  delete userObject.password;

  return { user: userObject, token };
}
