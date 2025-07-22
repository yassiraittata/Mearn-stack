import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/auth";

export default function PrivetRoute() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const token = useAuthStore((state) => state.token);
  return userInfo && token ? <Outlet /> : <Navigate to="/auth/login" />;
}
