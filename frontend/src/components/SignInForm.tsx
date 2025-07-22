import { useRef } from "react";
import axios from "../utils/axios";
import useAuthStore from "../store/auth.ts";

export const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const { setCredentials } = useAuthStore((state) => state);

  async function submitHandler(event: React.FormEvent) {
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
  }

  return (
    <form className="w-full max-w-sm text-white" onSubmit={submitHandler}>
      <div className="mb-6">
        <label className="block text-white mb-2 text-sm" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2.5 text-white rounded-md border border-gray-500 outline-none text-sm"
          placeholder="Enter your email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <label className="block text-white mb-2 text-sm" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2.5 text-white rounded-md border border-gray-500 outline-none text-sm"
          placeholder="Enter your password"
          ref={passwordRef}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-700  text-white p-2 rounded-md cursor-pointer"
      >
        Sign In
      </button>
    </form>
  );
};
