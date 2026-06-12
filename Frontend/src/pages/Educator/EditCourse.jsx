import React, { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../lib/axiosClient";
import { setCreatorCourseData } from "../../redux/courseSlice";

function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector((state) => state.course);
  const course = creatorCourseData?.find((c) => c._id === courseId);

  const [title, setTitle] = useState(course?.title || "");
  const [subTitle, setSubTitle] = useState(course?.subTitle || "");
  const [description, setDescription] = useState(course?.description || "");
  const [category, setCategory] = useState(course?.category || "");
  const [level, setLevel] = useState(course?.level || "");
  const [price, setPrice] = useState(course?.price || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(course?.thumbnail || null);
  const [loading, setLoading] = useState(false);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("subTitle", subTitle);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("level", level);
    formdata.append("price", price);
    if (thumbnail) formdata.append("image", thumbnail);
    try {
      const { data } = await axiosClient.post(`/api/course/editcourse/${courseId}`, formdata);
      dispatch(setCreatorCourseData(
        creatorCourseData.map((c) => c._id === courseId ? data : c)
      ));
      toast.success("Course updated successfully");
      navigate("/educator/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="w-full h-[64px] bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate("/educator/courses")}
          className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="text-sm font-semibold text-neutral-900">Edit Course</span>
        <div className="ml-auto">
          <button
            onClick={() => navigate(`/createlecture/${courseId}`)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-black text-white rounded-md hover:bg-neutral-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Manage Lectures
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">

          {/* Thumbnail preview banner */}
          {previewUrl && (
            <div className="w-full h-44 overflow-hidden border-b border-neutral-100">
              <img
                src={previewUrl}
                alt="Course thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete React Bootcamp"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Subtitle</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="A short tagline for your course"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will students learn in this course?"
              />
            </div>

            {/* Category + Level row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Category</label>
                <select
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="App Development">App Development</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="AI Tools">AI Tools</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Design">Design</option>
                  <option value="Ethical Hacking">Ethical Hacking</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI UX Designing">UI UX Designing</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Level</label>
                <select
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all bg-white"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Price (₹)</label>
              <input
                type="number"
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 1999"
              />
            </div>

            {/* Thumbnail upload */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Thumbnail {previewUrl ? "(click to replace)" : ""}
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-neutral-300 rounded-md p-2 text-sm
                  file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0
                  file:text-xs file:font-medium file:bg-neutral-900 file:text-white
                  hover:file:bg-neutral-700 transition-all cursor-pointer"
                onChange={handleThumbnailChange}
              />
            </div>

            {/* Save button */}
            <button
              className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
              onClick={handleUpdate}
            >
              {loading ? <ClipLoader size={16} color="white" /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
