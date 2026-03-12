import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message.jsx";
import useGetMessages from "../hooks/useGetMessages.js";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages.js";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessages();

  const { messages } = useSelector((state) => state.message);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center select-none">
          <p className="text-3xl mb-3">👋</p>
          <p className="text-sm font-semibold text-base-content/40">No messages yet</p>
          <p className="text-xs text-base-content/25 mt-1">Be the first to say hello!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 sm:py-4 flex flex-col gap-1 sm:gap-2">
      {messages.map((msg) => (
        <Message key={msg._id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
