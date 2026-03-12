import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice.js";
import api from "../api/axiosInstance.js";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [mediaFile, setMediaFile] = useState(null);       // single file (image or video)
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaType, setMediaType] = useState("");         // "image" | "video"
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Revoke object URL on change/unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    };
  }, [mediaPreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    const maxSize = isVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024;

    if (!isVideo && !isImage) {
      alert("Only images and videos are allowed");
      return;
    }
    if (file.size > maxSize) {
      alert(isVideo ? "Video must be under 20MB" : "Image must be under 5MB");
      return;
    }

    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    setMediaType(isVideo ? "video" : "image");
  };

  const clearMedia = () => {
    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    setMediaFile(null);
    setMediaPreview("");
    setMediaType("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message.trim() && !mediaFile) return;
    setLoading(true);
    try {
      let imageUrl = "";
      let videoUrl = "";
      if (mediaFile) {
        const b64 = await toBase64(mediaFile);
        if (mediaType === "video") videoUrl = b64;
        else imageUrl = b64;
      }
      const res = await api.post(
        `/api/v1/message/send/${selectedUser._id}`,
        { message, imageUrl, videoUrl },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(addMessage(res.data.newMessage));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending message");
    } finally {
      setMessage("");
      clearMedia();
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
    <div className="px-4 sm:px-5 py-3 sm:py-4 bg-base-100 border-t border-base-content/8 shrink-0">
      {/* Media preview */}
      {mediaPreview && (
        <div className="mb-3 flex items-start gap-3 p-3 rounded-2xl bg-base-200/60 border border-base-content/8">
          <div className="relative inline-block">
            {mediaType === "video" ? (
              <video
                src={mediaPreview}
                className="h-16 sm:h-20 rounded-xl border-2 border-primary/30 max-w-xs shadow-sm"
                controls
              />
            ) : (
              <img
                src={mediaPreview}
                alt="preview"
                className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-xl border-2 border-primary/30 shadow-sm"
              />
            )}
            <button
              onClick={clearMedia}
              className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-error text-white rounded-full text-xs flex items-center justify-center shadow-lg hover:bg-error/80 transition-colors font-bold"
            >
              ✕
            </button>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-base-content/60">
              {mediaType === "video" ? "Video selected" : "Image selected"}
            </p>
            <p className="text-[10px] text-base-content/40 mt-0.5">
              {(mediaFile?.size / (1024 * 1024)).toFixed(1)} MB
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Attach button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          title="Attach image or video"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-base-200/80 hover:bg-primary/15 hover:text-primary active:scale-95 transition-all text-base-content/45 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 bg-base-200/60 hover:bg-base-200 focus:bg-base-200/80 rounded-2xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-primary/30 focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-base-content/35 text-base-content font-medium"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Send button */}
        <button
          onClick={sendMessageHandler}
          disabled={loading || (!message.trim() && !mediaFile)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-md shadow-primary/25 shrink-0"
          title="Send message"
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

