import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import axiosClient from "../lib/axiosClient";
import { setUserData } from "../redux/userSlice";

function EditProfile() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(userData?.photo || null);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    if (photo) formdata.append("photo", photo);

    try {
      const { data } = await axiosClient.put("/api/user/updateprofile", formdata);
      dispatch(setUserData(data.user));
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 flex items-center justify-center">
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8 max-w-md w-full flex flex-col space-y-6">

        <div>
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-black flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-black"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <h2 className="text-base font-bold text-neutral-900">Edit Profile</h2>

        {/* Avatar Preview */}
        <div className="flex flex-col items-center gap-3">
          {preview ? (
            <img src={preview} className="w-20 h-20 rounded-full object-cover border border-neutral-200 shadow-sm" alt="Preview" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-neutral-950 flex items-center justify-center text-white text-lg font-bold border border-neutral-800 uppercase shadow-inner">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <label className="text-xs text-neutral-500 cursor-pointer hover:text-black underline underline-offset-2">
            Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Bio / Description</label>
            <textarea
              className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full py-2.5 bg-black hover:bg-neutral-900 text-white rounded-md text-xs font-semibold transition-colors duration-200 shadow-sm disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}

export default EditProfile;


