import { useRef, useState, type TextareaHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { showErrorToast, showSuccessToast } from "../utils/toast";

export const CreateProject = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title || !description) {
      showErrorToast("All feilds are required");
      return;
    }

    setIsLoading(true);

    try {
      const projectData = {
        title,
        description,
      };

      const response = await axios.post("/projects/create", projectData);
      console.log("Project created:", response);
      if (response.status === 201) {
        showSuccessToast("Project created successfully");
        titleRef.current!.value = "";
        descriptionRef.current!.value = "";
        navigate("/projects");
      } else {
        throw new Error("Failed to create project");
      }
      setIsLoading(false);
    } catch (error) {
      showErrorToast("An error occurred while creating the project");
      setIsLoading(false);
      return;
    }
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-20">
          <h1 className="text-4xl font-extrabold border-l-4 pl-3 border-primary-500">
            Create project
          </h1>
          <p className="mt-2 text-gray-400">let's create your project</p>
        </div>
        <form className="w-full max-w-4xl" onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block  mb-2 text-sm" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm"
              placeholder="Enter your title"
              ref={titleRef}
            />
          </div>
          <div className="mb-6">
            <label className="block  mb-2 text-sm" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm"
              placeholder="Enter your description"
              rows={4}
              ref={descriptionRef}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-700   p-2 rounded-md cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
            ) : (
              "Create Project"
            )}
          </button>
        </form>
      </section>
    </>
  );
};
