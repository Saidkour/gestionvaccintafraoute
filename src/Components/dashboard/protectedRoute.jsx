import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import { getUserSelectore } from "../../redux/slides/userSlice";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(getUserSelectore) === undefined;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
