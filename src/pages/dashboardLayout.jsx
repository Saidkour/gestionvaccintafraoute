import SideBarItem from "../Components/dashboard/sideBarItem";
import PropTypes from "prop-types";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import profileImg from "../Assets/profileDashboardImg.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLoadingSelectore,
  getUserSelectore,
  logoutUser,
} from "../redux/slides/userSlice";

const DashboardLayout = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const dispatch = useDispatch();
  const userLoading = useSelector(getUserLoadingSelectore);
  const user = useSelector(getUserSelectore);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    // console.log(user);
    setFullName(user?.name + " " + user?.lastName);

    // if (!user?.name && !userLoading) navigate("/login");
  }, [user?.name, user?.lastName, navigate, userLoading, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <>
      <div className="w-full ">
        <nav className="w-full bg-gray-50 h-[60px]">
          <div className="container p-2 flex relative justify-end items-center">
            <button
              onClick={(e) => setToggleSideBar((prev) => !prev)}
              type="button"
              className=" absolute left-2 z-50 p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <div className="flex items-center justify-center float-end gap-3">
              <p>{fullName}</p>
              <div className="max-w-[40px] w-full">
                <img
                  src={profileImg}
                  className="w-full rounded-[50%] "
                  alt=""
                />
              </div>
            </div>
          </div>
        </nav>
        <div className="container p-5">
          <aside
            id="default-sidebar"
            className={`${
              toggleSideBar ? "translate-x-0" : " md:translate-x-0"
            } fixed top-0 left-0 z-40 w-40 h-screen transition-transform -translate-x-full`}
          >
            <div className="h-full px-3 relative py-4 overflow-y-auto bg-gray-50 pt-12">
              <h1 className="font-bold">dashboard</h1>
              <ul className="mt-5 flex flex-col">
                <SideBarItem
                  onClick={(e) => setToggleSideBar((prev) => !prev)}
                  to="/dashboard/orders"
                >
                  Orders
                </SideBarItem>
                <SideBarItem
                  onClick={(e) => setToggleSideBar((prev) => !prev)}
                  to="/dashboard/vaccine"
                >
                  Vaccine
                </SideBarItem>
                {/* <SideBarItem
                  onClick={(e) => setToggleSideBar((prev) => !prev)}
                  to="/dashboard/contact"
                >
                  Contact
                </SideBarItem> */}
                <SideBarItem
                  onClick={(e) => setToggleSideBar((prev) => !prev)}
                  to="/dashboard/createOrder"
                >
                  Create order
                </SideBarItem>
                <SideBarItem
                  onClick={(e) => setToggleSideBar((prev) => !prev)}
                  to="/dashboard/addVaccine"
                >
                  Add Vaccine
                </SideBarItem>

                <SideBarItem
                  onClick={(e) => setToggleSideBar((prev) => !prev)}
                  to="/dashboard/settings"
                >
                  Settings
                </SideBarItem>

                <button
                  className="flex items-center ms-3 p-1 rounded-lg hover:bg-gray-100 "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          </aside>
          <div className="p-1 sm:p-2 md:ms-40">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
