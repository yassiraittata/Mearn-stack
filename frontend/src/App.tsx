import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivetRoute from "./components/routes/PrivateRoutes";
import Projects from "./components/Projects";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Signin />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <PrivetRoute />,
    children: [
      {
        path: "/projects",
        element: <Projects />,
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
