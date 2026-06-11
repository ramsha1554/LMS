import React, { useState } from "react";
import axiosClient from "../../lib/axiosClient";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";


function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    if (!title.trim() || !category) {
      toast.error("Title and category are required");
      return;
    }

    setLoading(true);
    try {
      const result = await axiosClient.post(
        "/api/course/create",
        { title, category }
      );
      console.log(result.data);
      navigate("/educator/courses");
      toast.success("Course Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="max-w-md w-full p-8 md:p-10 bg-white border border-neutral-200 shadow-xl rounded-xl relative flex flex-col space-y-6">
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate("/educator/courses")}
            className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-black flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-black"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Create Course
          </h2>
          <p className="text-xs text-neutral-400">
            Build and publish your course content.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter course title"
              className="w-full p-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all duration-200 shadow-sm bg-white"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div>
            <label
              htmlFor="cat"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              Course Category
            </label>
            <select
              id="cat"
              className="w-full p-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all duration-200 shadow-sm bg-white cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
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

          <div className="pt-2">
            <button
              className="w-full bg-black hover:bg-neutral-900 active:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm flex items-center justify-center gap-2"
              disabled={loading}
              onClick={handleCreateCourse}
            >
              {loading ? (
                <ClipLoader size={16} color="white" />
              ) : (
                "Create Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourses;

