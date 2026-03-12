import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setOtherUsers, setSelectedUser, setFilteredUsers } from "../redux/userSlice.js";
import { setMessages } from "../redux/messageSlice.js";
import { disconnectSocket } from "../socket/socket.js";
import OtherUsers from "./OtherUsers.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.js";

const Sidebar = () => {
  useGetOtherUsers();
  const [search, setSearch] = useState("");
  const { allUsers, authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get("/api/v1/user/logout", { withCredentials: true });
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
    <div className="w-72 flex flex-col bg-base-200 border-r border-base-300">
      {/* Profile header */}
      <div className="px-4 pt-5 pb-4 border-b border-base-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img
              src={authUser?.profilePhoto}
              alt={authUser?.fullName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-200"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-base-content truncate">{authUser?.fullName}</p>
            <p className="text-xs text-success">Active now</p>
          </div>
          <button
            onClick={logoutHandler}
            title="Logout"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-error/20 text-base-content/50 hover:text-error transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search contacts…"
            className="w-full bg-base-300 rounded-full pl-9 pr-4 py-2 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/40"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">Contacts</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <OtherUsers />
      </div>
    </div>
  );
};

export default Sidebar;


