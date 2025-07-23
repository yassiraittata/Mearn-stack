import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    developers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
    },
  },
  {
    timestamps: true,
  }
);
export default model("Project", projectSchema);
