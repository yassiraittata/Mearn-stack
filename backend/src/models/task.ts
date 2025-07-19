import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },

    developer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Task", taskSchema);
