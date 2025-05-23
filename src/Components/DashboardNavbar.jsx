import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  faCalendar,
  faBriefcase,
  faUsers,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserAuth } from "../context/authcontext";

const navigation = [
  { name: "Dashboard", href: "/charity-dashboard", icon: faHouse },
  {
    name: "Opportunities",
    href: "/charity-dashboard/opportunities",
    icon: faCalendar,
  },
  { name: "Projects", href: "/charity-dashboard/projects", icon: faBriefcase },
  { name: "Volunteers", href: "/charity-dashboard/volunteers", icon: faUsers },
];

export default function DashboardNavbar() {
  const location = useLocation();
  const { logout } = useUserAuth();

  return (
    <div className="bg-white shadow ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-cyan-500">
              Hope<span className="text-black">Link</span>
            </span>
            <nav className="ml-10 flex space-x-8 h-16">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname === item.href
                      ? "border-cyan-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="mr-2 text-gray-400"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
