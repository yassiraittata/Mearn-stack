import { create } from "zustand";
import type { Task } from "../models/tasks";
import axios from "../utils/axios";
import type { Project } from "../models/project";

type TasksState = {
  tasks: Task[];
  getTasksList(id: string): Promise<Project>;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
};

const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],

  async getTasksList(projectId: string) {
    const response = await axios.get(`/projects/${projectId}/tasks`);

    get().setTasks(response.data.tasks);

    return response.data;
  },

  setTasks(tasks: Task[]) {
    set(() => ({
      tasks,
    }));
  },

  addTask(task: Task) {
    const list = [...this.tasks, task];

    set(() => ({
      tasks: list,
    }));
  },
}));

export default useTasksStore;
