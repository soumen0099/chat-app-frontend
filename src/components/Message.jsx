import React, { useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((state) => state.user);
  const [imgOpen, setImgOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const isSender = message.senderId === authUser?._id;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className={`message flex items-end gap-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
        <img
          src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          alt="avatar"
          className="w-7 h-7 rounded-xl object-cover shrink-0 mb-1 shadow-sm"
        />
        <div className={`max-w-[78%] sm:max-w-[68%] flex flex-col gap-1 ${isSender ? "items-end" : "items-start"}`}>
          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="sent"
              className="rounded-2xl max-w-60 max-h-60 object-cover cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              onClick={() => setImgOpen(true)}
            />
          )}
          {message.videoUrl && (
            <video
              src={message.videoUrl}
              className="rounded-2xl max-w-60 sm:max-w-xs max-h-60 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              controls
              onClick={() => setVideoOpen(true)}
            />
          )}
          {message.message && (
            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
              isSender
                ? "bg-primary text-primary-content rounded-br-sm shadow-primary/20"
                : "bg-base-200 text-base-content rounded-bl-sm"
            }`}>
              {message.message}
            </div>
          )}
          <span className="text-[10px] text-base-content/35 px-1 font-medium">
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
      
      {/* Image lightbox */}
      {imgOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setImgOpen(false)}
        >
          <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src={message.imageUrl} alt="full" className="max-w-full max-h-[90vh] rounded-lg sm:rounded-2xl shadow-2xl" />
        </div>
      )}

      {/* Video lightbox */}
      {videoOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setVideoOpen(false)}
        >
          <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video
            src={message.videoUrl}
            className="max-w-full max-h-[90vh] rounded-lg sm:rounded-2xl shadow-2xl"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Message;

