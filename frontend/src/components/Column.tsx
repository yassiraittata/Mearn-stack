import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../models/tasks";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";
import { useRef } from "react";

function Column({ status, tasks }: { status: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { status },
  });

  const dialog = useRef(null);

  return (
    <>
      <AddTaskForm ref={dialog} status={status} />
      <div className="h-full bg-[#1c1c1c] p-4 rounded-3xl" ref={setNodeRef}>
        <div className="flex items-start justify-between w-full p-3 mb-4">
          <h1 className="text-3xl font-extrabold text-white first-letter:uppercase ">
            {status}
          </h1>
          <button
            className="text-2xl text-primary-50 cursor-pointer hover:scale-125 transition"
            onClick={() => dialog.current.open()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-5 flex flex-col">
          {tasks.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Column;
