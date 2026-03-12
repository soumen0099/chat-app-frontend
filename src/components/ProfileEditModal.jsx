import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";
import api from "../api/axiosInstance.js";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const ProfileEditModal = ({ onClose }) => {
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [preview, setPreview] = useState(authUser?.profilePhoto || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Photo must be under 5MB");
      return;
    }
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      let profilePhoto = "";
      if (photoFile) {
        profilePhoto = await toBase64(photoFile);
      }

      const res = await api.put("/api/v1/user/profile/update", {
        fullName: fullName.trim(),
        profilePhoto,
      });

      // Update redux store with new profile data
      dispatch(setAuthUser({ ...authUser, fullName: res.data.fullName, profilePhoto: res.data.profilePhoto }));
      setSuccess("Profile updated!");
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-b from-base-100 to-base-100/95 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full max-w-sm p-5 sm:p-7 border border-base-content/5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center">Edit Profile</h2>

        {/* Avatar picker */}
        <div className="flex flex-col items-center mb-5 sm:mb-7">
          <div className="relative">
            <img
              src={preview}
              alt="profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-primary/40 shadow-lg"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 bg-linear-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
              title="Change photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <p className="text-xs text-primary font-semibold mt-2 sm:mt-3">Click camera to change</p>
        </div>

        <form onSubmit={handleSave} className="space-y-3 sm:space-y-4">
          {/* Full name */}
          <div className="form-control">
            <label className="label pb-1 sm:pb-2">
              <span className="label-text font-semibold text-xs sm:text-sm">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full h-9 sm:h-10 text-sm bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          {/* Username (readonly) */}
          <div className="form-control">
            <label className="label pb-1 sm:pb-2">
              <span className="label-text font-semibold text-xs sm:text-sm">Username</span>
              <span className="label-text-alt text-base-content/40 text-xs\">Read-only</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full h-9 sm:h-10 text-sm bg-base-300/50 border-base-300 opacity-60 cursor-not-allowed"
              value={authUser?.userName || ""}
              readOnly
            />
          </div>

          {error && (
            <div className="bg-error/10 border border-error/30 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-error flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-success/10 border border-success/30 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-success flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <div className="flex gap-2 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1 rounded-lg h-9 sm:h-10 text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 rounded-lg h-9 sm:h-10 text-sm shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
