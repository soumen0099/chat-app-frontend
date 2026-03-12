import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

const Login = () => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      // Token is tab-specific sessionStorage mein save karo
      if (res.data.token) {
        sessionStorage.setItem("chatapp_token", res.data.token);
      }
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-300 via-base-200 to-primary/10 p-4">
      <ThemeToggle variant="compact" />
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl bg-linear-to-b from-base-100 to-base-100/95 border border-base-content/5">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-primary to-primary/70 mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-sm text-base-content/60">
            Sign in to continue to{" "}
            <span className="font-bold text-primary">ChatApp</span>
          </p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/30 rounded-lg mb-5 p-3 text-sm text-error flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-sm">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-sm">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg h-11 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
          </button>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-content/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-base-content/40">New to ChatApp?</span>
            </div>
          </div>

          <Link to="/signup" className="btn btn-ghost w-full rounded-lg h-11 font-medium hover:bg-primary/10">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
