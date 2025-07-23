import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuthStore from "../../store/auth";

export default function PrivetRoute() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const { logout } = useAuthStore((state) => state);

  // Check if the token is valid and not expired
  // If the token is expired or not present, redirect to login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expirationTime");

    if (!token || !expiration) {
      logout();
      navigate("/auth/login");
      return;
    }

    const expiresIn = parseInt(expiration) - Date.now();

    console.log("Token expires in:", expiresIn);

    if (expiresIn <= 0) {
      logout();
      navigate("/auth/login");
      return;
    }

    // Set timeout to auto-logout when token expires
    const timeoutId = setTimeout(() => {
      logout();
      navigate("/auth/login");
      toast.error("Your session is expired, Please sign in!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, expiresIn);

    return () => clearTimeout(timeoutId);
  }, [logout]);

  return userInfo && token ? <Outlet /> : <Navigate to="/auth/login" />;
}
