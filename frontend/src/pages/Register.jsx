import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../service/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(name, email, password);

      if (res) {
        // 🔥 optional: auto login after register
        if (res.token) {
          localStorage.setItem("token", res.token);
        }

        if (res.user.token) {
          localStorage.setItem("user", JSON.stringify(res.user.token));
        }

        // 👉 redirect to login or home
        navigate("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f2efe6] p-6 rounded-xl shadow-md w-full max-w-md space-y-4 transition duration-300 hover:shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-[#173626]">
          Register
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full border px-3 py-2 rounded-md border-[#e0dcd1]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full border px-3 py-2 rounded-md border-[#e0dcd1]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border px-3 py-2 rounded-md border-[#e0dcd1]"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#173626] text-white py-2 rounded-md"
        >
          Register
        </button>

        <p className="text-center text-sm text-[#173626]">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
