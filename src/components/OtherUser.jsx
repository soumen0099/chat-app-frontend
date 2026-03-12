import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);

  const isOnline = onlineUsers.includes(user._id);
  const isSelected = selectedUser?._id === user._id;

  return (
    <div
      onClick={() => dispatch(setSelectedUser(user))}
      className={`relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 ${
        isSelected ? "bg-primary/12" : "hover:bg-base-100/70"
      }`}
    >
      {/* Left accent bar for selected state */}
      {isSelected && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-9 rounded-r-full bg-primary" />
      )}

      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <img
          src={user.profilePhoto}
          alt={user.fullName}
          className="w-12 h-12 rounded-2xl object-cover shadow-sm"
        />
        {isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-base-100 shadow-sm" />
        )}
      </div>

      {/* Text info */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate leading-tight mb-0.5 ${
          isSelected ? "text-primary" : "text-base-content"
        }`}>
          {user.fullName}
        </p>
        <p className={`text-xs truncate ${
          isOnline ? "text-success font-medium" : "text-base-content/35"
        }`}>
          {isOnline ? "Active now" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default OtherUser;
