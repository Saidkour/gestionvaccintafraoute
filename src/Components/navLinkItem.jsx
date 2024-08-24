import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinkItem = ({ children, isDark, setMenuOpen, ...other }) => {
  return (
    <>
      <NavLink
        onClick={() => setMenuOpen(false)}
        className={`relative after:bg-primary no-underline  hover:text-primary ${
          !isDark ? "text-black" : "text-semi-white"
        } `}
        {...other}
      >
        {children}
      </NavLink>
    </>
  );
};
NavLinkItem.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isDark: PropTypes.bool,
  setMenuOpen: PropTypes.func,
};

export default NavLinkItem;
