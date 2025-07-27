import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../models/tasks";
import TodoItem from "./TodoItem";

function Column({ status, tasks }: { status: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { status },
  });
  return (
    <div className="h-full bg-gray-800 p-4 rounded-3xl" ref={setNodeRef}>
      <h1 className="text-3xl font-extrabold text-white  p-3 mb-4 first-letter:uppercase ">
        {status}
      </h1>
      <div className="space-y-5">
        {tasks.map((task) => (
          <TodoItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
