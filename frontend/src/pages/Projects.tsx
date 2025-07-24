import { useEffect, useState } from "react";

import axios from "../utils/axios";
import { type Project } from "../models/project";
import ProjectItem from "../components/ProjectItem";
import ProjectsLoading from "../components/UI/ProjectsLoading";

const Projects = () => {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects");
        const projects = response.data.map((el: Project) => ({
          ...el,
          id: el._id,
        })) as Project[];
        setProjectsList(projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  function removeProject(id: string) {
    setProjectsList((prev) => prev.filter((project) => project.id !== id));
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold border-l-4 pl-3 border-primary-500">
          Projects
        </h1>
        <p className="mt-2 text-gray-400">
          Here you can find a list of projects that you have worked on.
        </p>
        <div className="mt-16">
          {loading && <ProjectsLoading />}
          {projectsList.length > 0 && (
            <ul className="grid grid-cols-3 gap-5">
              {projectsList.map((project) => (
                <ProjectItem
                  key={project.id}
                  id={project.id!}
                  title={project.title}
                  description={project.description}
                  removeProject={removeProject}
                />
              ))}
            </ul>
          )}
          {error && (
            <div className="flex flex-col items-center gap-4 mt-32">
              <div className="flex flex-col items-start gap-2 bg-red-200 text-red-800 p-5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  className="size-32"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-heading-3 font-heading-3 fonset-bold text-3xl">
                  Error
                </p>
                <span className=" text-gray-400">{error} </span>
              </div>
            </div>
          )}
          {!loading && projectsList.length === 0 && !error && (
            <div className="flex flex-col items-center gap-4 mt-32">
              <div className="flex flex-col items-start gap-2 bg-gray-800 p-5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  className="size-32"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-heading-3 font-heading-3 fonset-bold text-3xl">
                  No documents yet
                </p>
                <span className=" text-gray-400">
                  Start working on your best ideas by creating a new document.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
