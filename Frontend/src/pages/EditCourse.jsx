import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../lib/axiosClient';
import { toast } from 'react-toastify';

function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditCourse = async () => {
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
      await axiosClient.post(`/api/course/editcourse/${courseId}`, formdata);
      toast.success("Course updated!");
      navigate("/educator/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeftLong className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer'
          onClick={() => navigate("/educator/courses")} />
        <h2 className='text-2xl font-semibold md:pl-[60px]'>Add Detail Information regarding the Course</h2>
        <button className='bg-black text-white px-4 py-2 rounded-md'
          onClick={() => navigate(`/createlecture/${courseId}`)}>
          Go to Lecture page
        </button>
      </div>

      <div className='bg-gray-50 p-6 rounded-md space-y-6'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
          <input type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Course Title'
            onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
          <input type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Course Subtitle'
            onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
          <textarea className='w-full border px-4 py-2 rounded-md h-24 resize-none' placeholder='Course Description'
            onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Thumbnail</label>
          <input type="file" accept='image/*'
            className='w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white'
            onChange={(e) => setThumbnail(e.target.files[0])} />
        </div>

        <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
            <select className='w-full border px-4 py-2 rounded-md bg-white'
              onChange={(e) => setCategory(e.target.value)} value={category}>
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
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Level</label>
            <select className='w-full border px-4 py-2 rounded-md bg-white'
              onChange={(e) => setLevel(e.target.value)} value={level}>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Price (INR)</label>
            <input type="number" className='w-full border px-4 py-2 rounded-md' placeholder='₹'
              onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>
        </div>

        <button className='w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition'
          disabled={loading} onClick={handleEditCourse}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default EditCourse;
// Deprecated duplicate root educator page. Use ./pages/Educator/EditCourse instead.
