import { useRef } from "react";
import axios from "../utils/axios";
import useAuthStore from "../store/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const { setCredentials } = useAuthStore((state) => state);

  async function submitHandler(event: React.FormEvent) {
    try {
      event.preventDefault();
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      // Handle sign-in logic here, e.g., API call
      const user = {
        email,
        password,
      };
      const resposnse = await axios.post("/auth/signin", user);
      console.log("Sign-in response:", resposnse);
      const userData = resposnse.data.user;
      const token = resposnse.data.token;

      setCredentials({ userInfo: { ...userData, id: userData._id }, token });
      navigate("/projects", { replace: true });
    } catch (e: unknown) {
      const errors = e.response?.data?.message.split(",") || [];

      errors.forEach((err: string) =>
        toast.error(err.trim(), {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
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
        className="w-full bg-primary-500 hover:bg-primary-700   p-2 rounded-md cursor-pointer"
      >
        Sign In
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
