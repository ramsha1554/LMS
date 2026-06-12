import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
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
  const [price, setPrice] = useState(course?.price || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("subTitle", subTitle);
    formdata.append("description", description);
    formdata.append("category", category);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center gap-2">
          <FaArrowLeftLong
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate("/educator/courses")}
          />
          <h2 className="text-xl font-semibold text-gray-800">Edit Course</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
        </div>

        <button
          className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? <ClipLoader size={16} color="white" /> : "Update Course"}
        </button>
      </div>
    </div>
  );
}

export default EditCourse;




