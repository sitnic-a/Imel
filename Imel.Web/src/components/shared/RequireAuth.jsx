import { Outlet, useNavigate } from "react-router-dom";
import { Login } from "./Login";

export const RequireAuth = () => {
  let jwToken = sessionStorage.getItem("token");

  if (jwToken) {
    return <Outlet />;
  }
  window.location.href = "/login";
  return <Login />;
};
