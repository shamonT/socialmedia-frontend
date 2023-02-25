import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/admin"} />;
  }
}

export default AdminProtectedRoute;
