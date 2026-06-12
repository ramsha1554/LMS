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
      const result = await axiosClient.post("/api/course/create", { title, category });
      console.log(result.data);
      navigate("/educator/courses");
      toast.success("Course Created Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
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
        <span className="text-sm font-semibold text-neutral-900">Create Course</span>
      </div>

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-xl p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-neutral-900">New Course</h2>
            <p className="text-xs text-neutral-400">Fill in the basics — you can add more details after.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Complete React Bootcamp"
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all bg-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
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

            <button
              className="w-full bg-black text-white py-2.5 rounded-md text-sm font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
              onClick={handleCreateCourse}
            >
              {loading ? <ClipLoader size={16} color="white" /> : "Create Course"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourses;
