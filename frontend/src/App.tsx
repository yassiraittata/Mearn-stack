import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
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
