import { Link } from "react-router-dom";

type ProjectItemProps = {
  id: string;
  title: string;
  description: string;
};

function ProjectItem({ id, title, description }: ProjectItemProps) {
  return (
    <li className="bg-primary-dark p-5 shadow-lg">
      <h2 className="text-xl font-semibold ">{title}</h2>
      <p className="mt-2 text-gray-300 text-sm ">
        {description.length > 100
          ? `${description.substring(0, 100)}...`
          : description}
      </p>
      <div className="mt-6">
        <Link
          to={`/projects/${id}`}
          className="text-primary-500 block font-semibold hover:texty-primary-600 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </li>
  );
}

export default ProjectItem;
