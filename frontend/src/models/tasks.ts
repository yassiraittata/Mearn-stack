import type { User } from "./User";

export interface Task {
  _id?: string;
  title: string;
  text: string;
  developer: string | User;
  project: string;
  status: "todo" | "in-progress" | "done";
  updatedAt?: string;
  createdAt?: string;
}
