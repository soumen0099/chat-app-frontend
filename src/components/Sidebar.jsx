import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";
import { setAuthUser, setOtherUsers, setSelectedUser, setFilteredUsers } from "../redux/userSlice.js";
import { setMessages } from "../redux/messageSlice.js";
import { disconnectSocket } from "../socket/socket.js";
import OtherUsers from "./OtherUsers.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.js";
import ProfileEditModal from "./ProfileEditModal.jsx";
import { useTheme } from "../hooks/useTheme.js";

const Sidebar = () => {
  useGetOtherUsers();
  const [search, setSearch] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { allUsers, authUser, selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const logoutHandler = async () => {
    try {
      await api.get("/api/v1/user/logout");
      sessionStorage.removeItem("chatapp_token");
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
      dispatch(setMessages(null));
      disconnectSocket();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (!val.trim()) {
      dispatch(setFilteredUsers(allUsers));
      return;
    }
    const filtered = allUsers?.filter(
      (u) =>
        u.fullName.toLowerCase().includes(val.toLowerCase()) ||
        u.userName.toLowerCase().includes(val.toLowerCase())
    );
    dispatch(setFilteredUsers(filtered));
  };

  return (
    <div className={`${selectedUser ? "hidden" : "flex"} md:flex w-full md:w-72 lg:w-80 flex-col bg-base-200/50 border-r border-base-content/8`}>

      {/* ── Brand & Actions Bar ── */}
      <div className="px-5 pt-5 pb-4 border-b border-base-content/8">

        {/* Logo + App name + icon buttons */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-[15px] leading-none text-base-content tracking-tight">ChatApp</h1>
            <p className="text-[10px] text-base-content/40 font-medium mt-0.5 leading-none">Real-time messaging</p>
          </div>
          {/* Theme toggle */}
          <button
            onClick={() => toggleTheme(theme === "night" ? "light" : "night")}
            title="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-base-100/80 text-base-content/50 hover:text-warning hover:bg-warning/15 transition-all shrink-0"
          >
            {theme === "night" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,1,1-10.45-10.45,1,1,0,0,0-.92-1.22A10,10,0,1,0,22.56,14.05,1,1,0,0,0,21.64,13Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
          {/* Logout */}
          <button
            onClick={logoutHandler}
            title="Logout"
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-base-100/80 text-base-content/50 hover:text-error hover:bg-error/15 transition-all shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Profile card */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-primary/10 border border-primary/15 cursor-pointer hover:bg-primary/15 transition-all group"
          onClick={() => setShowEditProfile(true)}
        >
          <img
            src={authUser?.profilePhoto}
            alt={authUser?.fullName}
            className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-primary/25"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-base-content truncate leading-tight">{authUser?.fullName}</p>
            <p className="text-[11px] text-base-content/45 truncate">@{authUser?.userName}</p>
          </div>
          <span className="text-primary/50 group-hover:text-primary transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-4 py-3 border-b border-base-content/5">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/35" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search contacts…"
            className="w-full bg-base-100/70 hover:bg-base-100 focus:bg-base-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none border border-base-content/8 focus:border-primary/40 focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-base-content/35 text-base-content"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* ── Section Label ── */}
      <div className="px-5 pt-3.5 pb-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/30">Contacts</span>
      </div>

      {/* ── Contacts List ── */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <OtherUsers />
      </div>

      {showEditProfile && (
        <ProfileEditModal onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
};

export default Sidebar;


