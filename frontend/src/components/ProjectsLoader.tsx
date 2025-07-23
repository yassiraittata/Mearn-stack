const ProjectsLoader = () => {
  return (
    <div className="mx-auto w-full max-w-sm  bg-primary-dark p-5 shadow-lg">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 rounded bg-gray-800"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-10 rounded bg-gray-800"></div>
              <div className="col-span-1 h-10 rounded bg-gray-800"></div>
            </div>

            <div className="h-8 rounded bg-primary-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsLoader;
