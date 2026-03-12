import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleGender = (gender) => setUser({ ...user, gender });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
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
    <div className="min-h-screen flex bg-base-200">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-linear-to-br from-secondary/80 to-primary/80 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px"}}></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Join ChatApp</h1>
          <p className="text-white/70 text-lg max-w-xs">Connect with friends instantly. Free forever.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-sm py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-base-content">Create account</h2>
            <p className="text-base-content/50 mt-1 text-sm">Fill in the details to get started</p>
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
              <label className="text-sm font-semibold text-base-content/70 mb-1.5 block">Full Name</label>
              <input type="text" placeholder="Your full name"
                className="w-full bg-base-300 rounded-xl px-4 py-3 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/30"
                value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} required />
            </div>

            <div>
              <label className="text-sm font-semibold text-base-content/70 mb-1.5 block">Username</label>
              <input type="text" placeholder="Choose a username"
                className="w-full bg-base-300 rounded-xl px-4 py-3 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/30"
                value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} required />
            </div>

            <div>
              <label className="text-sm font-semibold text-base-content/70 mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} placeholder="Create a password"
                  className="w-full bg-base-300 rounded-xl px-4 py-3 pr-12 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/30"
                  value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-base-content/70 mb-1.5 block">Confirm Password</label>
              <input type="password" placeholder="Repeat your password"
                className="w-full bg-base-300 rounded-xl px-4 py-3 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/30"
                value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} required />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-semibold text-base-content/70 mb-2 block">Gender</label>
              <div className="flex gap-3">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGender(g)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all capitalize ${
                      user.gender === g
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-base-content/10 bg-base-300 text-base-content/60 hover:border-primary/40"
                    }`}
                  >
                    {g === "male" ? "👦 Male" : "👧 Female"}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading || !user.gender}
              className="w-full bg-primary hover:bg-primary/90 text-primary-content font-semibold py-3 rounded-xl transition-all text-sm shadow-lg shadow-primary/30 disabled:opacity-50 mt-2">
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
