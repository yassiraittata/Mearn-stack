import type { Task } from "../models/tasks";

type Status = "todo" | "in-progress" | "done";

export function groupTasksByStatus(tasks: Task[]): Map<Status, Task[]> {
  // Initialize the map with all statuses
  const statusMap = new Map<Status, Task[]>();
  const allStatuses: Status[] = ["todo", "in-progress", "done"];

  for (const status of allStatuses) {
    statusMap.set(status, []);
  }

  // Group tasks into the map
  for (const task of tasks) {
    statusMap.get(task.status)?.push(task);
  }

  return statusMap;
}
