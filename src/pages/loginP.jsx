import { Link } from "react-router-dom";
import { useLogin } from "../hocks/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slides/userSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    role,
    email,
    password,
    loading,
    error,
    handleRoleChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    user,
  } = useLogin();
  useEffect(() => {
    if (user?.id) {
      dispatch(addUser(user));
      navigate("/dashboard");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="relative  w-full  h-screen flex flex-col justify-center items-center">
      <div className='absolute top-0 left-0 w-full h-full bg-[url("/login-bg-img.jpg")] opacity-[0.6]  bg-cover bg-center z-[-1]'></div>
      <div className="absolute bg-black w-full h-full left-0 right-0 bottom-0 opacity-[0.60] bg-cover z-[-1] bg-center top-0"></div>
      <form
        id="form"
        className="relative px-6 py-9 w-10/12 xl:w-5/12 md:w-8/12 rounded shadow-lg"
      >
        <div className="absolute z-[-1] bg-semi-white w-full h-full left-0 right-0 bottom-0  opacity-60 top-0"></div>
        <div
          id="login"
          className="text-2xl font-bold tracking-widest flex justify-center items-center"
        >
          LOGIN
          <span className="ml-2">
            <LoginIcon />
          </span>
        </div>
        {error?.err && (
          <p className="text-red-500 text-xs italic">{error?.err}</p>
        )}
        <div className=" w-full xl:w-10/12 md:w-10/12 m-auto flex justify-center flex-col items-start  mt-6">
          <select
            className="w-full p-2 outline-semi-gray text-gray-400 font-medium"
            name="role"
            id="role"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="">Select Your Role</option>
            <option value="doctor">doctor</option>
            <option value="asistant">asistant</option>
          </select>
          {error?.role && (
            <p className="text-red-500 text-xs italic">{error?.role}</p>
          )}
        </div>

        <div className="w-full xl:w-10/12 md:w-10/12 m-auto flex justify-center flex-col items-start  mt-5">
          <input
            className="w-full p-2 outline-semi-gray text-gray-500 font-medium"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {error?.email && (
            <p className="text-red-500 text-xs italic">{error?.email}</p>
          )}
        </div>

        <div className="w-full xl:w-10/12 md:w-10/12 m-auto flex justify-center flex-col items-start mt-5">
          <input
            className="w-full p-2 outline-semi-gray text-gray-500 font-medium"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error?.password && (
            <p className="text-red-500 text-xs italic">{error?.password}</p>
          )}
        </div>

        <div className="w-full xl:w-10/12 md:w-10/12 m-auto flex justify-end items-center mt-3">
          <Link to={"/forgetPassword"} className="underline">
            forget password !
          </Link>
        </div>

        <div className="w-full xl:w-10/12 md:w-10/12 flex justify-center items-center  m-auto mt-6">
          <button
            className="bg-semi-gray w-full px-7 py-2 text-[20px] text-white hover:bg-blue-100 border-2  border-transparent hover:text-semi-gray hover:border-semi-gray duration-200 "
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

function LoginIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="rgb(116 156 173)"
      className="w-7 h-7 "
      id="icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
