import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin";
import PrivetRoute from "./components/routes/PrivateRoutes";
import Projects from "./components/Projects";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Signin />,
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
