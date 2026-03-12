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
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-primary/20 border-l-2 border-primary"
          : "hover:bg-base-300/50 border-l-2 border-transparent"
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={user.profilePhoto}
          alt={user.fullName}
          className={`w-11 h-11 rounded-full object-cover ring-2 transition-all ${
            isSelected ? "ring-primary" : "ring-base-content/10"
          }`}
        />
        {isOnline && (
          <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-200"></span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${
          isSelected ? "text-primary" : "text-base-content"
        }`}>
          {user.fullName}
        </p>
        <p className={`text-xs truncate ${
          isOnline ? "text-success" : "text-base-content/40"
        }`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default OtherUser;
