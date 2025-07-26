export interface Task {
  createdAt: string;
  developer: string;
  project: string;
  status: "todo" | "in-progress" | "done";
  text: string;
  title: string;
  updatedAt: string;
  _id: string;
}
