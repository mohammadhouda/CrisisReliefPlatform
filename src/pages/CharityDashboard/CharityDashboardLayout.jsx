import React from "react";
import DashboardNavbar from "../../Components/DashboardNavbar";
import { Outlet } from "react-router-dom";

export default function CharityDashboardLayout() {
  return (
    <div>
      <DashboardNavbar />
      <div
        className="space-y-6 p-6 bg-slate-100"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Outlet />
      </div>
    </div>
  );
}
