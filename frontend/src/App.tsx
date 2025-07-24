import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivetRoute from "./components/routes/PrivateRoutes";
import Projects from "./pages/Projects";
import AuthRoutes from "./components/routes/AuthRoutes";
import { CreateProject } from "./pages/CreateProject";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthRoutes />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivetRoute />,
    children: [
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/create",
        element: <CreateProject />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
