import mongoose from "mongoose";
import createError from "http-errors";

export const validatMongoDbId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, "Invalid ID format");
  }
};
