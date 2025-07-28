import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Task } from "../models/tasks";
import Column from "./Column";
import axios from "../utils/axios";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Board = ({ tasks }: { tasks: Record<string, Task[]> }) => {
  const [tasksByStatus, setTasksByStatus] = useState(tasks); // initial from props or API

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;
    const { id: draggedId } = active;
    const overColumn = over.id;

    const [sourceColumn] =
      Object.entries(tasksByStatus).find(([_, items]) =>
        items.some((item) => item._id === draggedId)
      ) || [];

    if (!sourceColumn || sourceColumn === overColumn) return;

    // find teh draged item
    const draggedItem = tasksByStatus[sourceColumn].find(
      (item) => item._id === draggedId
    );

    // filter out draged item
    const newSourceList = tasksByStatus[sourceColumn].filter(
      (item) => item._id !== draggedId
    );

    // add the draged item to the new column
    const newDestList = [...tasksByStatus[overColumn], draggedItem];

    setTasksByStatus((tasks) => ({
      ...tasks,
      [sourceColumn]: newSourceList,
      [overColumn]: newDestList,
    }));

    try {
      const res = await axios.put("/tasks/" + draggedItem?._id, {
        status: overColumn,
      });

      if (res.status != 200) throw new Error("something went wrong");
    } catch (err) {
      const message = err.response.data.message || "Something went wrog!";
      showErrorToast(message);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-[70vh] mt-16 grid grid-cols-3 gap-10">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <Column key={status} status={status} tasks={tasks} />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
