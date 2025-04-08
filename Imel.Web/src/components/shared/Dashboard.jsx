import React from "react";
import { Login } from "./Login";
import { AdminDashboard } from "../../pages/AdminDashboard";
import { UserDashboard } from "../../pages/UserDashboard";
import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";

export const Dashboard = () => {
  let { loggedUser } = fetchLocationStateHook();

  const __ADMIN_ROLE_ID = 1;
  const __USER_ROLE_ID = 2;

  if (loggedUser.roles.some((role) => role.id === __ADMIN_ROLE_ID)) {
    return <AdminDashboard />;
  }
  if (loggedUser.roles.some((role) => role.id === __USER_ROLE_ID)) {
    return <UserDashboard />;
  }
};
