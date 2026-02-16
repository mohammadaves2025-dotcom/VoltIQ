import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiZap } from "react-icons/fi";

const Login = ({ setToken }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (mode === "register") {
        const res = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        );

        if (res.data.success) {
          toast.success("Account created successfully");
          setMode("login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        );

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen relative flex items-start md:items-center justify-center bg-[#070B16] overflow-hidden pt-24 md:pt-0">

      

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-[#020617]" />

      {/* Glow accents */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-emerald-400/10 blur-[120px] rounded-full -bottom-40 -right-40" />

      <div className="relative w-full max-w-sm sm:max-w-md px-4 sm:px-0 z-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Smart Energy AI
          </h1>
          <p className="text-gray-400 mt-3 text-xs sm:text-sm">
            Predict and optimize your monthly electricity usage
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

          {/* Tabs */}
          <div className="flex mb-6 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-md text-sm transition ${
                mode === "login"
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-md text-sm transition ${
                mode === "register"
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">

            {mode === "register" && (
              <div>
                <label className="text-xs text-gray-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-gray-400">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 text-black hover:opacity-90 transition"
            >
              {mode === "login" ? "Login" : "Create Account"}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Powered by MERN + FastAPI + Random Forest ML
        </p>

      </div>
    </div>
  );
};

export default Login;

