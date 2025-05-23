// src/pages/CharityDashboard/CharityDashboardHome.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendar,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../../context/authcontext";
import { ref, get } from "firebase/database";
import { database } from "../../Components/firebase";
import { Link } from "react-router-dom";

export default function CharityDashboardHome() {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [opportunitiesCount, setOpportunitiesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [recentOpportunities, setRecentOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      name: "Opportunities",
      value: opportunitiesCount,
      color: "bg-cyan-600",
      href: "/charity-dashboard/opportunities",
      icon: faCalendar,
    },
    {
      name: "Projects",
      value: projectsCount,
      color: "bg-cyan-600",
      href: "/charity-dashboard/projects",
      icon: faBriefcase,
    },
    {
      name: "Volunteers",
      value: volunteersCount,
      color: "bg-cyan-600",
      href: "/charity-dashboard/volunteers",
      icon: faUsers,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      const userRef = ref(database, `users/${user.uid}`);

      // Get charity name
      const userSnap = await get(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.val();
        setName(userData.name || "Unknown Charity");

        // Get Opportunities
        const opps = userData.opportunities || {};
        const oppArray = Object.entries(opps).map(([id, value]) => ({
          id,
          ...value,
        }));

        // Sort by most recent if possible
        const sorted = [...oppArray].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOpportunitiesCount(oppArray.length);
        setRecentOpportunities(sorted.slice(0, 2));

        // Projects
        const projects = userData.projects || {};
        setProjectsCount(Object.keys(projects).length);

        // Volunteers
        // Instead of counting volunteers keys:
        const volunteersCount = userData.volunteersCount || 0;
        setVolunteersCount(volunteersCount);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Charity Name */}
          <div className="text-2xl font-bold text-gray-900 uppercase">
            {name}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <Link
                key={stat.name}
                to={stat.href}
                className="group overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-md ${stat.color} text-white`}
                    >
                      <FontAwesomeIcon icon={stat.icon} className="h-5 w-5" />
                    </div>
                    <div className="ml-5">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Opportunities */}
          <div className="rounded-lg bg-white shadow">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Opportunities
              </h2>
              <Link
                to="/charity-dashboard/opportunities"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOpportunities.map((o) => (
                <div key={o.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {o.title}
                      </h3>
                      <div className="mt-1 text-sm text-gray-500 flex gap-2">
                        <span>{o.location}</span> • <span>{o.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="mr-1" />
                        {o.applicants}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          o.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <Link
                to="/charity-dashboard/opportunities"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
              >
                Create new opportunity
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <Link
                to="/charity-dashboard/opportunities"
                className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="mr-3 text-gray-400"
                />
                Post New Opportunity
              </Link>
              <Link
                to="/charity-dashboard/projects"
                className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="mr-3 text-gray-400"
                />
                Add New Project
              </Link>
              <Link
                to="/charity-dashboard/volunteers"
                className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="mr-3 text-gray-400"
                />
                Review Applications
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
