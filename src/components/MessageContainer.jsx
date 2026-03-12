import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";
import Messages from "./Messages.jsx";
import SendInput from "./SendInput.jsx";

const MessageContainer = () => {
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);
  const dispatch = useDispatch();

  return (
    <div className={`${!selectedUser ? "hidden" : "flex"} md:flex flex-1 flex-col bg-base-100 min-w-0`}>
      {selectedUser ? (
        <>
          {/* ── Premium Chat Header ── */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-base-content/8 bg-base-100 shadow-[0_1px_12px_rgba(0,0,0,0.06)] shrink-0">
            <div className="flex items-center gap-3">
              {/* Mobile back button — clears selection to show contact list */}
              <button
                onClick={() => dispatch(setSelectedUser(null))}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl hover:bg-base-200 text-base-content/60 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={selectedUser.profilePhoto}
                  alt={selectedUser.fullName}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover shadow-md"
                />
                {isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-base-100 shadow-sm" />
                )}
              </div>

              {/* Name & status */}
              <div className="min-w-0">
                <p className="font-bold text-sm sm:text-[15px] text-base-content truncate leading-tight">{selectedUser.fullName}</p>
                <p className={`text-xs font-medium mt-0.5 ${isOnline ? "text-success" : "text-base-content/40"}`}>
                  {isOnline ? "● Active now" : "○ Offline"}
                </p>
              </div>
            </div>

            {/* Options button */}
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-base-200 text-base-content/35 hover:text-base-content transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {/* Messages scroll area */}
          <Messages />

          {/* Input bar */}
          <SendInput />
        </>
      ) : (
        /* ── Premium Empty State ── */
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 select-none">
          <div className="relative">
            <div className="w-28 h-28 rounded-4xl bg-linear-to-br from-primary/15 via-primary/8 to-primary/4 border border-primary/12 flex items-center justify-center shadow-xl shadow-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-primary/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            {/* Decorative accent dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary/20" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-primary/10" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-base-content/50 mb-2 tracking-tight">Start a conversation</h3>
            <p className="text-sm text-base-content/30 max-w-55 leading-relaxed">Pick a contact from the sidebar and say hello!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

