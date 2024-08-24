import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
// import  {store} from "../REDUX/Store/store"
// import { Provider } from "react-redux";
import Footer from "../Components/footer";

import { fetchActiveVaccine } from "../redux/slides/vaccineSlice";
import { useDispatch } from "react-redux";
const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle((prevState) => !prevState);
    console.log(toggle);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActiveVaccine());
  }, [dispatch]);

  return (
    <>
      <NavBar handleClick={handleClick} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
