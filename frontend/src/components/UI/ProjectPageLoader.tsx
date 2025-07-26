const ProjectPageLoader = () => {
  return (
    <div className="mx-auto w-full max-w-7xl   mt-16">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-12 rounded bg-gray-800"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-8 rounded bg-gray-800"></div>
            </div>

            <div className="h-[70vh]  mt-16 grid grid-cols-3 gap-4">
              <div className=" h-full rounded bg-gray-800"></div>
              <div className=" h-full rounded bg-gray-800"></div>
              <div className=" h-full rounded bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageLoader;
