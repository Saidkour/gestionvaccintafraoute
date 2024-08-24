import { Link } from "react-router-dom";

export default function ResetPassword() {
  
  return (
    <>
      <div className="w-full  h-[100vh] flex flex-col justify-center items-center ">
        <div className=" w-10/12 xl:w-5/12 md:w-5/12 p-2  flex justify-center items-end font-light rounded-t-lg  border border-b-0 border-gray-200">
          <span className="font-bold text-2xl tracking-wide text-blue-400">
            New Password
          </span>
        </div>

        <div className="bg-blue-100 shadow-xl w-10/12 xl:w-5/12 md:w-5/12 p-9 rounded-md rounded-t-none flex flex-col justify-center items-center">
          <div className="w-10/12 lg:w-9/12 md:w-9/12 flex justify-around items-center mb-3">
            <input
              className="w-full p-2 outline-blue-200  border-2"
              name="password"
              type="password"
              placeholder="New Password..."
            />
          </div>
          <div className="w-10/12 lg:w-9/12 md:w-9/12 flex justify-around items-center mb-3">
            <input
              className="w-full p-2 outline-blue-200  border-2"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password..."
            />
          </div>
          <div className="w-10/12 lg:w-9/12 md:w-9/12  flex justify-start items-center mt-3 ">
            <button
              className="border bg-blue-400  px-4 py-2 rounded text-white font-medium mr-3 hover:border hover:border-semi-gray hover:bg-blue-500 duration-150 ease-out"
              type="submit"
            >
              <Link className="tracking-widest text-[15px]" to={""}>
                Submit
              </Link>
            </button>
            <button
              className="border hover:bg-blue-400 hover:text-white text-blue-400 px-4 py-2 rounded  font-medium hover:border border-blue-400  duration-150 ease-out"
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
