import type { Task } from "../models/tasks";

type Status = "todo" | "in-progress" | "done";

export function groupTasksByStatus(tasks: Task[]): Record<Status, Task[]> {
  const grouped: Record<Status, Task[]> = {
    todo: [],
    "in-progress": [],
    done: [],
  };

  for (const task of tasks) {
    grouped[task.status].push(task);
  }

  return grouped;
}
