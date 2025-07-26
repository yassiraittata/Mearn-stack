import type { Task } from "../models/tasks";

function Board({ tasks }: { tasks: Record<string, Task[]> }) {
  return (
    <>
      {JSON.stringify(tasks)}
      <div className="min-h-[70vh]  mt-16 grid grid-cols-3 gap-10">
        <div className="h-full rounded bg-gray-800"></div>
        <div className="h-full rounded bg-gray-800"></div>
        <div className="h-full rounded bg-gray-800"></div>
      </div>
    </>
  );
}

export default Board;
