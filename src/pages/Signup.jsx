import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle.jsx";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("/api/v1/user/register", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-300 via-base-200 to-primary/10 p-4">
      <ThemeToggle variant="compact" />
      <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl bg-linear-to-b from-base-100 to-base-100/95 border border-base-content/5 my-4">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-primary to-primary/70 mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.667 0-8 1.334-8 4v2h16v-2c0-2.666-5.333-4-8-4z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">Join ChatApp</h1>
          <p className="text-sm text-base-content/60">
            Create an account to start messaging
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

        <form onSubmit={onSubmitHandler} className="space-y-3">
          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-sm">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-sm">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
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
              placeholder="••••••••"
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-sm">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {/* Gender */}
          <div className="form-control py-2">
            <label className="label pb-2">
              <span className="label-text font-semibold text-sm">Gender</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-primary"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                />
                <span className="label-text">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-primary"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                />
                <span className="label-text">Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg h-11 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-content/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-base-content/40">Already signed up?</span>
            </div>
          </div>

          <Link to="/login" className="btn btn-ghost w-full rounded-lg h-11 font-medium hover:bg-primary/10">
            Sign In Instead
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
