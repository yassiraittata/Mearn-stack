// import { DndContext, type DragEndEvent } from "@dnd-kit/core";

// import type { Task } from "../models/tasks";
// import Column from "./Column";
// import { useState } from "react";

// function Board({ tasks }: { tasks: Record<string, Task[]> }) {
//   const [tasksList, setTasksList] = useState<Record<string, Task[]>>(tasks);

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over) return;

//     const taskId = active.id as string;
//     const targetStatus = over.id as string;

//     // // Update the task's status in the tasksList
//     // setTasksList((prevTasks) => {
//     //   const updatedTasks = { ...prevTasks };
//     //   for (const status in updatedTasks) {
//     //     updatedTasks[status] = updatedTasks[status].filter(
//     //       (task) => task._id !== taskId
//     //     );
//     //   }
//     //   const movedTask = prevTasks[active.data.current.status].find(
//     //     (task) => task._id === taskId
//     //   );
//     //   if (movedTask) {
//     //     movedTask.status = targetStatus;
//     //     updatedTasks[targetStatus].push(movedTask);
//     //   }
//     //   return updatedTasks;
//     // });

//     setTasksList((item) => {
//       const taskItemIndex = item[over.data.current.status].findIndex(
//         (el) => el._id === taskId
//       );
//       const [removedItem] = item[over.data.current.status].splice(
//         taskItemIndex,
//         1
//       );

//       // console.log("REMOVED", removedItem);

//       item[targetStatus].push(removedItem);

//       return item;
//     });
//     console.log("TARGET", targetStatus);

//     console.log("Task moved:", active, over);
//   };

//   return (
//     <>
//       {JSON.stringify(tasksList)}
//       <DndContext onDragEnd={handleDragEnd}>
//         <div className="min-h-[70vh]  mt-16 grid grid-cols-3 gap-10">
//           {Object.entries(tasks).map(([status, tasks]) => (
//             <Column key={status} status={status} tasks={tasks} />
//           ))}
//         </div>
//       </DndContext>
//     </>
//   );
// }

// export default Board;

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

const Board = ({ tasks }: { tasks: Record<string, Task[]> }) => {
  const [tasksByStatus, setTasksByStatus] = useState(tasks); // initial from props or API

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const { id: draggedId } = active;
    const overColumn = over.id;

    console.log("ACTIVE : ", active);
    console.log("OVER : ", over);

    const [sourceColumn] =
      Object.entries(tasksByStatus).find(([_, items]) =>
        items.some((item) => item._id === draggedId)
      ) || [];

    if (!sourceColumn || sourceColumn === overColumn) return;

    const draggedItem = tasksByStatus[sourceColumn].find(
      (item) => item._id === draggedId
    );

    const newSourceList = tasksByStatus[sourceColumn].filter(
      (item) => item._id !== draggedId
    );
    const newDestList = [...tasksByStatus[overColumn], draggedItem];

    setTasksByStatus({
      ...tasksByStatus,
      [sourceColumn]: newSourceList,
      [overColumn]: newDestList,
    });

    console.log("TESRT  ", tasksByStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      {JSON.stringify(tasksByStatus)}
      <div className="min-h-[70vh] mt-16 grid grid-cols-3 gap-10">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <Column key={status} status={status} tasks={tasks} />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
