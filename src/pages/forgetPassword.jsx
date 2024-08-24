import { useState } from "react";
import { Link } from "react-router-dom";
import { forgetPass } from "../api/axios";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setError(null);
    forgetPass(email, setError, setLoading);
  };

  return (
    <>
      <div className="w-full  h-[100vh] flex flex-col justify-center items-center ">
        <div className=" w-10/12 xl:w-5/12 md:w-5/12 p-2  flex justify-center items-end font-light rounded-t-lg  border border-b-0 border-gray-200">
          <span className="font-bold text-2xl tracking-wide text-blue-400">
            Confirmation
          </span>
          <Icon />
        </div>

        <div className="bg-blue-100 shadow-xl w-10/12 xl:w-5/12 md:w-5/12 p-9 rounded-md rounded-t-none flex flex-col justify-center items-center">
          {error?.err && (
            <p className="text-red-500 text-xs italic mb-2">{error?.err}</p>
          )}
          <div className="w-10/12 lg:w-9/12 md:w-9/12 flex justify-around flex-col items-start mb-3">
            <input
              className="w-full p-2 outline-blue-200  border-2"
              name="email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error?.email && (
              <p className="text-red-500 text-xs italic">{error?.email}</p>
            )}
          </div>
          <div className="w-10/12 lg:w-9/12 md:w-9/12  flex justify-start items-center mt-3 ">
            <button
              onClick={handleSubmit}
              className="border bg-blue-400  px-4 py-2 rounded text-white font-medium mr-3 hover:border hover:border-semi-gray hover:bg-blue-500 duration-150 ease-out"
              type="submit"
              disabled={loading}
            >
              Get Code
            </button>

            <button
              onClick={handleSubmit}
              className="border bg-blue-400 px-4 py-2 rounded text-white font-medium hover:border hover:border-semi-gray hover:bg-blue-500 duration-150 ease-out"
              type="submit"
            >
              <Link className="tracking-widest text-[15px]" to={"/login"}>
                back
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="rgb(96 165 250)"
      className="w-7 h-7 ml-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
};
