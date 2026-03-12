import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../src/redux/userSlice.js";

const LogIn = () => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/user/login", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch(setAuthUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
      setUser({ userName: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-linear-to-br from-primary/80 to-secondary/80 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px"}}></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">ChatApp</h1>
          <p className="text-white/70 text-lg max-w-xs">Real-time messaging with your friends and team.</p>
          <div className="flex gap-3 mt-8 justify-center">
            {[1,2,3].map(i => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-base-content">Welcome back</h2>
            <p className="text-base-content/50 mt-1 text-sm">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-error/15 border border-error/30 text-error text-sm rounded-xl px-4 py-3 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-base-content/70 mb-1.5 block">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full bg-base-300 rounded-xl px-4 py-3 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/30"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-base-content/70 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-base-300 rounded-xl px-4 py-3 pr-12 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/30"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70">
                  {showPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-content font-semibold py-3 rounded-xl transition-all text-sm shadow-lg shadow-primary/30 disabled:opacity-50 mt-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
