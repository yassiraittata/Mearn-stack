import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/auth";

export default function AuthRoutes() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const token = useAuthStore((state) => state.token);

  return !userInfo || !token ? <Outlet /> : <Navigate to="/projects" />;
}
