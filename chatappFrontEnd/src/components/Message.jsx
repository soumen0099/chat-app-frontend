import React, { useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((state) => state.user);
  const [imgOpen, setImgOpen] = useState(false);

  const isSender = message.senderId === authUser?._id;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className={`flex items-end gap-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
        <img
          src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-1 ring-base-content/10"
        />
        <div className={`max-w-[70%] flex flex-col gap-1 ${isSender ? "items-end" : "items-start"}`}>
          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="sent"
              className="rounded-2xl max-w-60 max-h-60 object-cover cursor-pointer shadow-md hover:opacity-90 transition-opacity"
              onClick={() => setImgOpen(true)}
            />
          )}
          {message.message && (
            <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
              isSender
                ? "bg-primary text-primary-content rounded-br-sm"
                : "bg-base-300 text-base-content rounded-bl-sm"
            }`}>
              {message.message}
            </div>
          )}
          <span className="text-[11px] text-base-content/40 px-1">
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
      {imgOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setImgOpen(false)}
        >
          <img src={message.imageUrl} alt="full" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </>
  );
};

export default Message;

