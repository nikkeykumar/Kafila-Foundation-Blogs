import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] px-4">
      <form className="bg-[#f2efe6] p-6 rounded-xl shadow-md w-full max-w-md space-y-4 transition duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#173626]">
          Register
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="w-full border px-3 py-2 rounded-md border-[#e0dcd1]
        focus:outline-none focus:ring-2 focus:ring-[#173626]
        transition duration-200 focus:scale-[1.02]"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full border px-3 py-2 rounded-md border-[#e0dcd1]
        focus:outline-none focus:ring-2 focus:ring-[#173626]
        transition duration-200 focus:scale-[1.02]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full border px-3 py-2 rounded-md border-[#e0dcd1]
        focus:outline-none focus:ring-2 focus:ring-[#173626]
        transition duration-200 focus:scale-[1.02]"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
        w-full bg-[#173626] text-white py-2 rounded-md
        transition duration-300
        hover:opacity-90 hover:scale-105
        active:scale-95
      "
        >
          Register
        </button>
        <p className="text-center text-sm text-[#173626]">
          Already have an account?<Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
