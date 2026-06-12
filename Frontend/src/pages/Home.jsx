import React, { useState } from "react";
import Nav from "../component/Nav";
import home from "../assets/home1.jpg";
import Logos from "../component/Logos";
import CardPage from "../component/CardPage";
import About from "../component/About";
import ExploreCourses from "../component/ExploreCourses";
import ReviewPage from "../component/ReviewPage";
import Footer from "../component/Footer";
import { Play, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allcourses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/allcourses");
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="w-full lg:h-[120vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          className="object-cover w-full h-full brightness-75"
          alt="Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/30">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl">
            Grow Your Skills to Advance <br />
            <span className="text-neutral-100">Your Career Path</span>
          </h1>

          {/* Search Bar */}
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="mt-6 flex items-center w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses..."
                className="flex-1 px-4 py-3 text-sm text-black outline-none"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 border border-white/80 text-white bg-white/10 hover:bg-white hover:text-black rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer backdrop-blur-md"
              onClick={() => navigate("/allcourses")}
            >
              View All Courses
              <Play className="w-4 h-4 fill-current" />
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-100 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              <Search className="w-4 h-4" />
              Search Courses
            </button>
          </div>
        </div>
      </div>
      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
};

export default Home;
