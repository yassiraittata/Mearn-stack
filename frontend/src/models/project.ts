import type { Task } from "./tasks";
import type { User } from "./User";

export interface Project {
  _id?: string;
  title: string;
  description: string;
  creator: string;
  developers?: string[] | User[];
  tasks?: string[] | Task[];
  updatedAt?: string;
  createdAt?: string;
}
