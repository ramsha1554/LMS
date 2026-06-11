import React, { useState, useMemo, useEffect } from "react";
import Nav from "../component/Nav";
import { useSelector } from "react-redux";
import Card from "../component/Card";
import usePublishedCourse from "../customHooks/usePublishedCourse";
import { BookOpen, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

const COURSES_PER_PAGE = 6;

function AllCourses() {
  usePublishedCourse();
  const { courseData = [] } = useSelector((state) => state.course || {});

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = courseData.map((c) => c.category).filter(Boolean);
    return [...new Set(cats)].sort();
  }, [courseData]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setPriceFilter("all");
  };

  const hasFilters = search || selectedCategories.length > 0 || priceFilter !== "all";

  const filtered = useMemo(() => {
    return courseData.filter((course) => {
      const matchesSearch = course.title?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && course.price === 0) ||
        (priceFilter === "paid" && course.price > 0);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [courseData, search, selectedCategories, priceFilter]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, priceFilter]);

  const totalPages = Math.ceil(filtered.length / COURSES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Nav />
      {/* Sidebar */}
      <aside className="w-[260px] h-screen bg-white border-r border-neutral-200 fixed top-0 left-0 pt-24 px-6 shadow-sm z-5 hidden md:block overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
              Filter Courses
            </h2>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-[10px] text-neutral-400 hover:text-black flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Search */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
              Search
            </span>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-neutral-50"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
              Categories
            </span>
            <div className="space-y-2">
              {categories.length === 0 && (
                <p className="text-xs text-neutral-400">No categories yet</p>
              )}
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer hover:text-black transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
              Price
            </span>
            <div className="space-y-2">
              {["all", "free", "paid"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer hover:text-black transition-colors duration-150"
                >
                  <input
                    type="radio"
                    name="price"
                    value={option}
                    checked={priceFilter === option}
                    onChange={() => setPriceFilter(option)}
                    className="border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full pt-24 pb-16 px-6 md:pl-[286px]">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            All Courses
          </h1>
          <span className="block text-xs text-neutral-500">
            {filtered.length} of {courseData.length} courses
          </span>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="mt-16 border border-dashed border-neutral-300 rounded-xl p-12 text-center max-w-md mx-auto flex flex-col items-center justify-center space-y-4 bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 text-neutral-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-neutral-900">No Courses Found</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Try adjusting your filters or search term.
              </p>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-black underline underline-offset-2 hover:text-neutral-600"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Courses */}
        <div className="flex flex-wrap gap-6 mt-8">
          {paginated.map((course, index) => (
            <Card key={index} course={course} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors
                  ${currentPage === page
                    ? "bg-black text-white"
                    : "border border-neutral-200 hover:bg-neutral-100 text-neutral-600"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
export default AllCourses;
