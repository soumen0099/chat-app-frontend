import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imageFile) return;
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await toBase64(imageFile);
      }
      const res = await axios.post(
        `/api/v1/message/send/${selectedUser._id}`,
        { message, imageUrl },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      dispatch(setMessages([...(messages || []), res.data.newMessage]));
    } catch (error) {
      console.error(error);
    } finally {
      setMessage("");
      clearImage();
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler(e);
    }
  };

  return (
    <div className="px-4 py-3 bg-base-200 border-t border-base-300">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-2 flex items-start gap-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-xl border-2 border-primary/40"
            />
            <button
              onClick={clearImage}
              className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full text-xs flex items-center justify-center shadow"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Image button */}
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          title="Attach image"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-base-300 hover:bg-primary/20 transition-colors text-base-content/70 hover:text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 bg-base-300 rounded-full px-5 py-2.5 text-sm outline-none border border-base-content/10 focus:border-primary transition-colors placeholder:text-base-content/40"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Send button */}
        <button
          onClick={sendMessageHandler}
          disabled={loading || (!message.trim() && !imageFile)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-primary/80 disabled:opacity-40 transition-all shadow-lg"
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs text-primary-content"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-content" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SendInput;

