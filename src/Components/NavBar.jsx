import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NavLinkItem from "./navLinkItem";
import Logo from "../Assets/logo5.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname);
  const [isTrensparent, setIsTransparent] = useState(false);

  useEffect(() => {
    setUrl(location.pathname);
    if (url === "/") {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  }, [location, url]);
  //   console.log(url);

  return (
    <>
      <nav
        className={`py-3 px-10 shadow-lg ${
          isTrensparent
            ? menuOpen
              ? "bg-semi-black relative  z-[999] top-0 left-0 w-full"
              : "bg-transparent absolute z-[999] top-0 left-0 w-full"
            : "bg-semi-white"
        }`}
      >
        <div className="container mx-auto flex max-w-[1440px] flex-col md:flex-row justify-start relative md:justify-between  ">
          <Link to={"/"} className="text-black w-fit font-bold flex ">
            <img
              src={Logo}
              alt=""
              className="  h-10  w-auto inline-block mr-2 "
            />
          </Link>
          <div className="md:hidden absolute right-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`text-primary focus:outline-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-auto h-6 stroke-primary  transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <ul
            className={`md:justify-center   mt-3 md:flex    md:m-0 md:items-center gap-4 flex-col md:flex-row ${
              menuOpen ? "" : "hidden"
            }`}
          >
            <li className="mt-3 md:mt-0">
              <NavLinkItem
                setMenuOpen={setMenuOpen}
                to={"/"}
                isDark={isTrensparent}
              >
                Home
              </NavLinkItem>
            </li>
            <li className="mt-3 mb-5 md:mb-0 md:mt-0">
              <NavLinkItem
                setMenuOpen={setMenuOpen}
                to={"/contact"}
                isDark={isTrensparent}
              >
                Contact
              </NavLinkItem>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

// props validation
NavBar.propTypes = {
  handleClick: PropTypes.func,
};

export default NavBar;
