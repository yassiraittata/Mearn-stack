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
    },

    developers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Task", taskSchema);
