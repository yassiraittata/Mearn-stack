import { useState, useEffect } from "react";
import type { Project } from "../models/project";
import { useParams } from "react-router-dom";

import axios from "../utils/axios";
import { showErrorToast } from "../utils/toast";
import ProjectPageLoader from "../components/UI/ProjectPageLoader";
import Board from "../components/Board";
import type { Task } from "../models/tasks";
import { groupTasksByStatus } from "../utils/tasks";

function ProjectPage() {
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});

  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/tasks`);
        console.log("Project fetched:", response);
        setProject({ ...response.data, id: response.data._id });

        setTasks(groupTasksByStatus(response.data.tasks));
      } catch (err) {
        showErrorToast("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <ProjectPageLoader />;
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold border-l-4 pl-3 border-primary-500">
          {project?.title}
        </h1>
        <p className="mt-2 text-gray-400">{project?.description}</p>
        <div className="mt-16">
          <Board tasks={tasks} />
        </div>
      </section>
    </>
  );
}

export default ProjectPage;
