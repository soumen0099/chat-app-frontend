import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import SendInput from "./SendInput.jsx";

const MessageContainer = () => {
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex-1 flex flex-col bg-base-100">
      {selectedUser ? (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-base-200 border-b border-base-300 shadow-sm">
            <div className="relative">
              <img
                src={selectedUser.profilePhoto}
                alt={selectedUser.fullName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200"></span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-base-content leading-tight">{selectedUser.fullName}</p>
              <p className={`text-xs font-medium ${isOnline ? "text-success" : "text-base-content/40"}`}>
                {isOnline ? "● Online" : "○ Offline"}
              </p>
            </div>
          </div>

          {/* Chat messages area */}
          <Messages />

          {/* Input */}
          <SendInput />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-base-content/30 select-none">
          <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-base-content/50">Welcome to ChatApp</h3>
            <p className="text-sm mt-1">Select a contact to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

