import React from "react";
import { useSelector } from "react-redux";
import OtherUser from "./OtherUser.jsx";

const OtherUsers = () => {
  const { otherUsers } = useSelector((state) => state.user);

  if (!otherUsers || otherUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-base-content/40 text-sm p-4">
        No users found
      </div>
    );
  }

  return (
    <div className="py-2">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
