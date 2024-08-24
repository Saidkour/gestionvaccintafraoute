import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SideBarItem = ({ children, ...others }) => {
  return (
    <>
      <li>
        <NavLink
          className="flex items-center p-1 rounded-lg hover:bg-gray-100 "
          {...others}
        >
          <span className="ms-3 text-primary ">{children}</span>
        </NavLink>
      </li>
    </>
  );
};

// types
SideBarItem.propTypes = {
  children: PropTypes.node,
};

export default SideBarItem;
