import { useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../models/tasks";
import { DeleteModal } from "./UI/DeleteModal";
import useTasksStore from "../store/tasks";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import AddTaskForm from "./AddTaskForm";

function TodoItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const dialog = useRef(null);

  const { deleteTask, isLoading } = useTasksStore((state) => state);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px) scale(1.1)`,
        zIndex: 50,
      }
    : undefined;

  function handleDelete() {
    if (!task._id) return;

    try {
      deleteTask(task._id);

      showSuccessToast("Task deleted successfully.");
      setDeleteModalVisible(false);
    } catch (error) {
      console.log(error);
      showErrorToast(
        error.message || "Failed to delete project. Please try again."
      );
    }
  }

  const handleDeleteClick = (e) => {
    setDeleteModalVisible(true);
  };

  return (
    <>
      {deleteModalVisible && (
        <DeleteModal
          cancelDelete={() => setDeleteModalVisible(false)}
          deletHandler={handleDelete}
          isLoading={isLoading}
        />
      )}
      <AddTaskForm
        ref={dialog}
        status="todo"
        isEdit={true}
        taskItem={task}
        id={task._id}
      />
      <div
        ref={setNodeRef}
        style={style}
        className="bg-[#3d3d3d] p-5 mb-5 rounded-xl text-white group relative"
      >
        <div className="bg-primary-dark/70 backdrop-blur-sm h-full p-3 group-hover:flex hidden cursor-pointer absolute top-0 left-0 w-full rounded-xl justify-between items-center">
          <div {...listeners} {...attributes}>
            <button className="cursor-grab">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
          </div>
          <div className=" flex items-center gap-2">
            <button
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => dialog.current.open()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-1">{task.title}</h3>
        <p className="text-sm text-gray-300 font-medium">
          {task.text || "No description provided"}
        </p>

        {task?.developer && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex size-5 rounded-full ring-1 bg-blue-800 items-center justify-center  uppercase font-bold text-[8px]">
              {task?.developer?.name?.substring(0, 2)}
            </div>
            {task?.developer?.name}
          </div>
        )}
      </div>
    </>
  );
}

export default TodoItem;
