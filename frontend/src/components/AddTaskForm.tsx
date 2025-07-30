import { useImperativeHandle, useRef, useState, type RefObject } from "react";
import { useParams } from "react-router-dom";
import type { Task } from "../models/tasks";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import useTasksStore from "../store/tasks";
import type { User } from "../models/User";
import useProjectsStore from "../store/projects";

type PropsType = {
  ref: RefObject<HTMLDialogElement | null>;
  status: "todo" | "in-progress" | "done";
  isEdit: boolean;
  taskItem: Task;
  id: string | undefined;
};

const AddTaskForm = ({ ref, status, isEdit, taskItem, id }: PropsType) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const { selectedProject } = useProjectsStore((state) => state);

  const { projectId } = useParams<{ projectId: string }>();

  const [enteredTitle, setEnteredTitle] = useState<string>(
    taskItem?.title || ""
  );
  const [enteredText, setEnteredText] = useState<string>(taskItem?.text || "");
  const [entereddeveloper, setEntereddeveloper] = useState<string>(
    taskItem?.developer?._id || ""
  );

  const { addTask, updateTask, isLoading } = useTasksStore((state) => state);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  function closeModal() {
    setEnteredTitle("");
    setEnteredText("");
    dialog.current?.close();
  }

  async function addTaskHandler() {
    const title = enteredTitle;
    const description = enteredText;

    if (!title || !description) {
      showErrorToast("Al feilds are required!");
      return;
    }
    const task: Task = {
      title,
      text: description,
      project: projectId || "",
      status: taskItem?.status || status,
      developer: entereddeveloper,
    };

    try {
      if (!projectId) return;

      if (isEdit)
        if (!id) return;
        else updateTask(id, task);
      else addTask(projectId, task);

      showSuccessToast(
        isEdit ? "Task updated successfully!" : "Task added successfully!"
      );
      dialog.current?.close();
    } catch (error) {
      showErrorToast(
        error.message || "Failed to edit project. Please try again."
      );
    }
  }

  return (
    <>
      <dialog
        className="bg-[#363636]  fixed top-[50%] left-[50%] -translate-[50%] min-w-xl p-10 text-white rounded-md backdrop:bg-black/70"
        ref={dialog}
      >
        <form>
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold border-l-4 pl-3 border-primary-500">
              New task
            </h1>
          </div>
          <div>
            <div className="mb-6">
              <label className="block  mb-2 text-sm" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm bg-gray-900"
                placeholder="Enter your title"
                value={enteredTitle}
                onChange={(e) => setEnteredTitle(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block  mb-2 text-sm" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm bg-gray-900"
                placeholder="Enter your description"
                rows={4}
                value={enteredText}
                onChange={(e) => setEnteredText(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block  mb-2 text-sm" htmlFor="developer">
                Developer
              </label>
              <select
                id="developer"
                className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm bg-gray-900"
                value={entereddeveloper}
                onChange={(e) => setEntereddeveloper(e.target.value)}
              >
                {selectedProject?.developers &&
                  (selectedProject.developers as User[]).map((user) => (
                    <option value={user._id}>{user.name}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="w-full bg-gray-500 hover:bg-gray-700   p-2 rounded-md cursor-pointer flex items-center justify-center"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full bg-primary-500 hover:bg-primary-700   p-2 rounded-md cursor-pointer flex items-center justify-center"
              onClick={addTaskHandler}
              disabled={isLoading}
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
              ) : isEdit ? (
                "Update Task"
              ) : (
                "Add Taks"
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddTaskForm;
