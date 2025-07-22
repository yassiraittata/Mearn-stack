import { SignUpForm } from "../components/SignUpForm";

const Signup = () => {
  return (
    <section className="w-screen h-screen flex ">
      <div className="w-1/3 bg-primary-dark p-5 flex  flex-col">
        <div>
          <h1 className="text-xl text-white font-semibold mb-5 flex items-baseline gap-1 ">
            Manager
            <span className="text-primary-600 text-sm font-medium">.com</span>
          </h1>
        </div>
        <div className="w-full grow flex items-center justify-center">
          <SignUpForm />
        </div>
        <div className="mt-auto text-gray-400 text-xs text-center">
          <p>&copy; 2025 Manager.com. All rights reserved.</p>
        </div>
      </div>
      <div className="w-2/3 bg-secondary-dark flex items-center justify-center">
        <div className="">
          <p className="text-gray-300 font-bold text-xl text-center mb-4 flex items-center justify-center gap-5">
            <div className="underline text-primary-50">Plan.</div>{" "}
            <div className="underline text-primary-50">Track.</div>{" "}
            <div className="underline text-primary-50">Done.</div>
          </p>
          <h1 className="text-white text-6xl font-extrabold text-center leading-16 italic">
            Stay on <b className="text-primary-100">Track</b> {""}
            <b className="text-primary-100">Deliver </b> <br /> on Time.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Signup;
