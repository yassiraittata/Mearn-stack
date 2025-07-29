import { Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "../utils/axios";
import { useState } from "react";
import { DeleteModal } from "./UI/DeleteModal";
import useProjectsStore from "../store/projects";

type ProjectItemProps = {
  id: string;
  title: string;
  description: string;
};

function ProjectItem({ id, title, description }: ProjectItemProps) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { deleteProject } = useProjectsStore((state) => state);

  async function handleDelete() {
    // setIsLoading(true);
    try {
      deleteProject(id);

      showSuccessToast("Project deleted successfully.");
      setDeleteModalVisible(false);
    } catch (error) {
      console.log(error);
      showErrorToast(
        error.message || "Failed to delete project. Please try again."
      );
    }
  }

  return (
    <>
      {deleteModalVisible && (
        <DeleteModal
          cancelDelete={() => setDeleteModalVisible(false)}
          deletHandler={handleDelete}
          isLoading={isLoading}
        />
      )}
      <li className="bg-primary-dark p-5 shadow-lg group">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold ">{title}</h2>
          <button
            type="button"
            className="group-hover:inline-flex hidden items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-red-900 rounded-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            onClick={() => setDeleteModalVisible(true)}
          >
            Delete
          </button>
        </div>
        <p className="mt-2 text-gray-300 text-sm ">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className="mt-6">
          <Link
            to={`/projects/${id}`}
            className="text-primary-500 block font-semibold hover:texty-primary-600 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </li>
    </>
  );
}

export default ProjectItem;
