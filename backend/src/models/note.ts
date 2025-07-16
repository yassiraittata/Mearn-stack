import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Note", noteSchema);
