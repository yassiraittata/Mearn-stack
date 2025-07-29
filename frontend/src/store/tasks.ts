import { create } from "zustand";
import type { Task } from "../models/tasks";
import axios from "../utils/axios";
import type { Project } from "../models/project";

type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  getTasksList(id: string): Promise<Project>;
  setTasks: (tasks: Task[]) => void;
  addTask: (projectId: string, task: Task) => void;
  updateTaskSatus: (
    id: string,
    status: "todo" | "in-progress" | "done"
  ) => void;
};

const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  isLoading: false,

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

  updateTaskSatus(id: string, status: "todo" | "in-progress" | "done") {
    const task = get().tasks.find((el) => el._id == id);

    if (task) {
      task.status = status;
    }

    console.log(get().tasks);
  },

  async addTask(projectId: string, task: Task) {
    try {
      set({ isLoading: true });
      const response = await axios.post(`/projects/${projectId}/tasks`, {
        title: task.title,
        text: task.text,
        status: task.status,
        developer: "68811eee7beb69a3ed394aef",
      });

      const data = response.data;

      if (response?.status != 201) {
        throw new Error("Something went wrong");
      }

      const list = [...get().tasks, data];

      set(() => ({
        tasks: list,
      }));
    } catch (err) {
      console.log(err);
      let message =
        e.response.data.message || "Failed to add task. Please try again.";

      throw new Error(message);
    }
    set({ isLoading: false });
  },
}));

export default useTasksStore;
