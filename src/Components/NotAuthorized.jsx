import React from "react";
import { Link } from "react-router-dom";

function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        <div className="mb-6">
          <div className="text-5xl text-red-500 font-bold">!</div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please check your
          credentials or return to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block bg-cyan-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotAuthorized;
