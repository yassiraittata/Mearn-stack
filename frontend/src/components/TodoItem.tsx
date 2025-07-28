import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../models/tasks";

function TodoItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px) scale(1.1)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-gray-600 p-5 mb-5 rounded-3xl text-white cursor-grab "
    >
      <h3 className="font-bold text-lg mb-3">{task.title}</h3>
      <p className="text-sm text-gray-300 font-medium">
        {task.text || "No description provided"}
      </p>
    </div>
  );
}

export default TodoItem;
