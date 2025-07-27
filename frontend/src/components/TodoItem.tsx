import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../models/tasks";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Transform.toString(transform) }}
      className="bg-gray-600 p-5 mb-5 rounded-3xl text-white cursor-pointer"
    >
      <h3 className="font-bold text-lg mb-3">{task.title}</h3>
      <p className="text-sm text-gray-300 font-medium">
        {task.text || "No description provided"}
      </p>
    </div>
  );
}

export default TodoItem;
