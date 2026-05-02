import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { authlogin } from "../service/auth.service";
import { AuthContext } from "../auth.context.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authlogin(email, password);
     

     
        // ✅ save user + token
    
        setUser(res.user);
       
        localStorage.setItem("user", JSON.stringify(res.user));
      
       
       

          localStorage.setItem( "token", res.token);
       

        // 🔥 role-based redirect
        if (res.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
     
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f2efe6] p-6 rounded-xl shadow-md w-full max-w-md space-y-4 transition duration-300 hover:shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-[#173626]">Login</h2>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          className="w-full bg-[#173626] text-white py-2 rounded-md
          transition duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
        >
          Login
        </button>

        <p className="text-center text-sm text-[#173626]">
          Don't have an account?{" "}
          <Link to="/register" className="underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
