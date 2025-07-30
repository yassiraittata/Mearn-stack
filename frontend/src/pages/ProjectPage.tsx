import { useState, useEffect } from "react";
import type { Project } from "../models/project";
import { useParams } from "react-router-dom";

import { showErrorToast } from "../utils/toast";
import ProjectPageLoader from "../components/UI/ProjectPageLoader";
import Board from "../components/Board";
import useTasksStore from "../store/tasks";
import type { User } from "../models/User";
import useProjectsStore from "../store/projects";

function ProjectPage() {
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);

  const { projectId } = useParams<{ projectId: string }>();
  const { getTasksList } = useTasksStore();
  const { setSelectedProject } = useProjectsStore((state) => state);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!projectId) return;
        const project = await getTasksList(projectId);
        setProject(project);
        setSelectedProject(project);
      } catch (err: unknown) {
        let message =
          err.response?.data?.message ||
          err?.message ||
          "Failed to fetch project details";
        showErrorToast(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, getTasksList, setSelectedProject]);

  if (loading) {
    return <ProjectPageLoader />;
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-extrabold border-l-4 pl-3 border-primary-500">
              {project?.title}
            </h1>
            <p className="mt-2 text-gray-400">{project?.description}</p>
          </div>
          <div className="flex -space-x-2">
            {project?.developers &&
              (project.developers as User[]).map((item) => (
                <div
                  className="flex size-10 rounded-full ring-2 bg-blue-800 items-center justify-center pr-2 uppercase font-bold text-sm"
                  key={item._id}
                >
                  {item.name?.substring(0, 2)}
                </div>
              ))}

            <button className="inline-block size-10 rounded-full ring-2 ring-white bg-white">
              +
            </button>
          </div>
        </div>
        <div className="mt-16">
          <Board />
        </div>
      </section>
    </>
  );
}

export default ProjectPage;
