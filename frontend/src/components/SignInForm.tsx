import { useRef, useState } from "react";
import axios from "../utils/axios";
import useAuthStore from "../store/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast } from "../utils/toast.ts";

export const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setCredentials } = useAuthStore((state) => state);

  async function submitHandler(event: React.FormEvent) {
    try {
      event.preventDefault();
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      setIsLoading(true);

      // Handle sign-in logic here, e.g., API call
      const user = {
        email,
        password,
      };
      const resposnse = await axios.post("/auth/signin", user);

      const userData = resposnse.data.user;
      const token = resposnse.data.token;

      setCredentials({ userInfo: { ...userData, id: userData._id }, token });
      navigate("/projects", { replace: true });
      setIsLoading(false);
    } catch (e: unknown) {
      const errors = e.response?.data?.message.split(",") || [];

      errors.forEach((err: string) => showErrorToast(err.trim()));
    }
  }

  return (
    <form className="w-full max-w-sm " onSubmit={submitHandler}>
      <div className="mb-10">
        <h3 className=" text-3xl font-bold">Welcome back</h3>
        <p className="text-sm font-medium text-gray-500">
          Sign in to your account
        </p>
      </div>
      <div className="mb-6">
        <label className="block  mb-2 text-sm" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm"
          placeholder="Enter your email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <label className="block  mb-2 text-sm" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2.5  rounded-md border border-gray-500 outline-none text-sm"
          placeholder="Enter your password"
          ref={passwordRef}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-700   p-2 rounded-md cursor-pointer flex items-center justify-center"
      >
        {isLoading ? (
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2 animate-spin"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
          </svg>
        ) : (
          "Sign In"
        )}
      </button>
      <Link
        to="/auth/signup"
        className="block text-center mt-4 text-sm text-primary-500 hover:underline"
      >
        Don't have an account? Sign Up
      </Link>
    </form>
  );
};
