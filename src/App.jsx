import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import HomeP from "./pages/HomeP";
import ContactP from "./pages/ContactP";
import Login from "./pages/loginP";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";
import VacsanForm from "./Components/VacsanForm";
import ErrorPage from "./pages/error404";
import DashboardLayout from "./pages/dashboardLayout";
import Orders from "./Components/dashboard/orders/orders";
import Vaccine from "./Components/dashboard/vaccine/vaccine";
import AddVacine from "./Components/dashboard/vaccine/addVacine";
import AddOrder from "./Components/dashboard/orders/AddOrder";
import Settings from "./Components/dashboard/Settings/Settings";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchUser, getUserSelectore } from "./redux/slides/userSlice";
import { Fragment, useEffect } from "react";
//
function App() {
  const user = useSelector(getUserSelectore);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeP />} />
          <Route path="contact" element={<ContactP />} />
          <Route path="vacsin/:id" element={<VacsanForm />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Fragment>
            <Route index element={<Orders />} />
            <Route path="orders" element={<Orders />} />{" "}
          </Fragment>

          <Route path="createOrder" element={<AddOrder />} />
          <Route path="vaccine" element={<Vaccine />} />
          {/* {user?.role === "asistant" && ( */}
          <Route path="addVaccine" element={<AddVacine />} />
          {/* )} */}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="forgetPassword" element={<ForgetPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<>check your link 404 route</>} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
