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
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
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

    console.log("TASK", response.data.tasks);

    get().setTasks(response.data.tasks);

    return response.data;
  },

  setTasks(tasks: Task[]) {
    set({
      tasks,
    });
  },

  updateTaskSatus(id: string, status: "todo" | "in-progress" | "done") {
    const task = get().tasks.find((el) => el._id == id);

    if (task) {
      task.status = status;
    }

    console.log(get().tasks);
  },

  async updateTask(id: string, task: Partial<Task>) {
    const { tasks } = get(); 
    const taskItemIndex = tasks.findIndex((el) => el._id === id);

    if (taskItemIndex === -1) {
      throw new Error("Task was not found!");
    }

    const updatedTask = {
      ...tasks[taskItemIndex],
      ...task,
      _id: id, 
    };

    try {
      const response = await axios.put(`/tasks/${id}`, updatedTask);

      if (response.status !== 200) {
        throw new Error("Failed to update task");
      }

      const updatedTasks = [...tasks];
      updatedTasks[taskItemIndex] = response.data;

      set({ tasks: updatedTasks });
    } catch (err) {
      console.error("Update task error:", err); // Better error logging
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to update task. Please try again.";

      throw new Error(message); // Re-throw for handling in UI
    }
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
        err?.response?.data?.message || "Failed to add task. Please try again.";

      throw new Error(message);
    }
    set({ isLoading: false });
  },

  async deleteTask(id: string) {
    try {
      set({ isLoading: true });

      const response = await axios.delete(`/tasks/${id}`);

      if (response.status !== 204) {
        throw new Error("Failed to delete task");
      }

      const list = get().tasks.filter((task) => task._id !== id);
      set({ tasks: list });
    } catch (err) {
      console.log(err);
      let message =
        err?.response?.data?.message ||
        "Failed to delete task. Please try again.";

      throw new Error(message);
    }
    set({ isLoading: false });
  },
}));

export default useTasksStore;
