import React from "react";
import UserNavbar from "../../Components/UserNavbar";
import { Outlet } from "react-router-dom";

export default function UserDashboardLayout() {
  return (
    <div>
      <UserNavbar />
      <div
        className="space-y-6 p-6 bg-slate-100"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Outlet />
      </div>
    </div>
  );
}
