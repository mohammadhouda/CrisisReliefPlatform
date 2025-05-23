import React, { useState } from "react";
import { useUserAuth } from "../context/authcontext";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

function CharityLoginPage() {
  const { login } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const role = await login(email, password);
      if (role === "charity") {
        setRedirectTo("/charity-dashboard");
      } else {
        setError("You are not authorized to log in here.");
      }
    } catch (err) {
      setError("fault credentials");
    } finally {
      setLoading(false);
    }
  };
  if (redirectTo) return <Navigate to={redirectTo} />;
  if (loading) return <Spinner />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-slate-200">
      <div className="w-full max-w-md bg-white  border border-gray-200  rounded-xl shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Charity <span className="text-cyan-500">Login</span>
          </h1>
          <p className="text-sm font-semibold">Login to your charity account</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-600 rounded hover:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-600"
          >
            Login
          </button>
          {error && (
            <div className=" text-sm text-red-600 bg-red-100  px-3 py-2 rounded">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2 text-center first-letter:uppercase">
            can't log in? contact IT Support
          </p>
        </form>
      </div>
    </div>
  );
}

export default CharityLoginPage;
