import { create } from "zustand";
import type { Project } from "../models/project";
import axios from "../utils/axios";

type TasksState = {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string;
  getProjectsList(): void;
  deleteProject(id: string): void;
  setSelectedProject: (project: Project) => void;
};

const useProjectsStore = create<TasksState>((set, get) => ({
  selectedProject: null,
  projects: [],
  isLoading: true,
  error: "",

  async getProjectsList() {
    set({ isLoading: true });
    try {
      const response = await axios.get("/projects");

      set({ projects: response.data });
    } catch (err) {
      const message = err.response.data.message || "Faild fetching projects!";

      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  async deleteProject(id: string) {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`/projects/${id}`);

      if (response.status !== 204) {
        throw new Error("Failed to delete project");
      }
      const projects = get().projects.filter((project) => project._id !== id);
      set({ projects });
    } catch (e) {
      console.log(e);
      let message =
        e.response.data.message ||
        "Failed to delete project. Please try again.";

      throw new Error(message);
    }
    set({ isLoading: false });
  },

  setSelectedProject(project: Project) {
    set({ selectedProject: project });
  },
}));

export default useProjectsStore;
