export interface Task {
  _id?: string;
  title: string;
  text: string;
  developer: string;
  project: string;
  status: "todo" | "in-progress" | "done";
  updatedAt?: string;
  createdAt?: string;
}
