import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";

const Header = () => {
  const { logout } = useAuthStore((state) => state);
  return (
    <header className="w-full p-2 bg-primary-dark border-b border-gray-700 shadow-md">
      <div className="max-w-7xl w-full mx-auto  flex items-center justify-between ">
        <h1 className="text-xl font-semibold flex items-baseline gap-1 ">
          Manager
          <span className="text-primary-600 text-sm font-medium">.com</span>
        </h1>
        <ul className="flex items-center gap-6">
          <li className=" hover:text-primary-400 transition-colors duration-200">
            <Link to="/projects">Projects</Link>
          </li>
          <li className=" hover:text-primary-400 transition-colors duration-200">
            <Link to="/projects/create">New project</Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <button
            className="nav-button hover:drop-shadow-lg flex w-full items-center justify-center rounded-full border border-red-200 bg-red-200 px-7 py-2 text-base font-bold text-secondary-dark ring-lime-600 ring-offset-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => logout()}
          >
            <span>Log out</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              className="ml-2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
