import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";

const SignUp = ({ onSignUp }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // student or instructor
    emailOptIn: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.emailOptIn) {
      toast.error("You must agree to receive emails with exciting discounts and personalized recommendations.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role, // send role to backend
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      if (onSignUp) onSignUp();
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 py-8 px-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="container max-w-xl w-full">
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="mb-2">
            <img src={logo} alt="Cursus Logo" className="h-10" />
          </a>
        </div>
        <div className="mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">Welcome to Cursus</h2>
          <p className="text-gray-500 mb-6 text-center">Sign Up and Start Learning or Teaching!</p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
                maxLength="32"
                placeholder="Username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                Choose Your Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                id="role"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
                maxLength="64"
                placeholder="Email Address"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
                maxLength="64"
                placeholder="Password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Email Opt-in */}
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="emailOptIn"
                name="emailOptIn"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded mt-1"
                checked={form.emailOptIn}
                onChange={handleChange}
                required
              />
              <label htmlFor="emailOptIn" className="ml-2 text-gray-600 text-sm">
                I’m in for emails with exciting discounts and personalized recommendations{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold py-2 rounded-lg shadow transition mb-4"
            >
              {loading ? "Signing Up..." : "Next"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mb-2">
            By signing up, you agree to our{" "}
            <a href="terms_of_use.html" className="text-indigo-600 hover:underline">Terms of Use</a> and{" "}
            <a href="privacy_policy.html" className="text-indigo-600 hover:underline">Privacy Policy</a>.
          </p>

          <p className="text-center text-gray-600 text-sm mt-6 mb-0">
            Already have an account?{" "}
            <a href="/sign_in" className="text-pink-500 font-medium hover:underline">
              Log In
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-xs">
          <img src="images/sign_logo.png" alt="" className="inline h-5 mr-1" />
          © 2025 <strong className="font-semibold text-gray-600">Cursus</strong>. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default SignUp;
