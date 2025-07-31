import React, { useState } from "react";
import { useUserAuth } from "../context/authcontext";
import { Link, Navigate } from "react-router-dom";
import Spinner from "./Spinner";

function UserLogin() {
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
      if (role === "user") {
        setRedirectTo("/user-dashboard");
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
            User <span className="text-cyan-500">Login</span>
          </h1>
          <p className="text-sm font-semibold">Login to your user account</p>
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
              required
              placeholder="user@example.com"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300  bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 "
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              required
              value={password}
              placeholder="76344842"
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300  bg-white  px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          {error && (
            <div className=" text-sm text-red-600 bg-red-100  px-3 py-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-cyan-600 hover:bg-cyan-700 text-white py-2 text-sm font-medium transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 ">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
        By logging in, you agree to our{" "}
        <Link href="#" className="underline hover:text-cyan-600">
          Terms of Service
        </Link>
        <Link href="#" className="underline hover:text-cyan-600">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default UserLogin;
