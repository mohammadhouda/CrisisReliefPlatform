import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/authcontext";

function UserSignup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser, setRole } = useUserAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Username is required";
    } else if (formData.name.length < 4) {
      newErrors.name = "Username must be at least 4 characters long";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co|io|dev)$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userId = userCredential.user.uid;
      const db = getDatabase();
      await set(ref(db, "users/" + userId), {
        name: formData.name,
        email: formData.email,
        role: "user",
      });

      setUser(userCredential.user);
      setRole("user");

      navigate("/user-login");
    } catch (err) {
      setError(err.message || "Failed to create account");
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-slate-200">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            User <span className="text-cyan-500">Signup</span>
          </h1>
          <p className="text-sm font-semibold">Create a new user account</p>
        </div>
        {loading && (
          <div className="mb-4 text-center text-cyan-500 font-medium">
            Creating account...
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 max-w-2xl"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="flex w-full justify-center items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-cyan-700"
          >
            Create account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/user-login"
              className="font-medium text-cyan-500-600 hover:text-cyan-500"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;
