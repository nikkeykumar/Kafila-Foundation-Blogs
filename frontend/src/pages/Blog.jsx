import React, { useEffect, useState } from "react";
import Navbar from "../componant/Navebar";
import BlogCard from "../componant/BlogCard";
import Footer from "../componant/Footer";
import { getAllBlogs } from "../service/Blogservice";
import logo from "../assets/logo-DvortFBw.png";
import banner from "../assets/banner-hero-ChglcoR-.png"

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [active, setActive] = useState("All");

  const categories = ["All", "Community", "Culture", "Education", "Technology"];

  // 🔥 API Call
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Filter Logic
  const filteredBlogs =
    active === "All" ? blogs : blogs.filter((blog) => blog.category === active);

  return (
    <main>
      <Navbar />

      <div className="bg-[#f7f6f2]">
        {/* Hero Section */}
        <section className="relative min-h-75 md:min-h-100 lg:min-h-125 flex items-center justify-center overflow-hidden">
          <img
            src={banner}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(23,54,38,0.6)]"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white pt-16">
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                className="w-15 h-15 md:w-28 md:h-28 object-contain"
              />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Welcome to Our Blog
            </h1>

            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">
              Stories, insights, and updates from the Kafila Foundation
              community.
            </p>
          </div>
        </section>

        {/* 🔥 Category Filter */}
        <div className="max-w-7xl mx-auto px-4 border-b border-[#e0dcd1]">
          <div className="flex flex-wrap gap-2 justify-center py-8">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform
          ${
            active === item
              ? "bg-[rgb(196,121,100)] text-white scale-105"
              : "border text-gray-700 hover:bg-gray-100 hover:scale-100 border-none"
          }`}
              >
                {item === "All" ? "All Categories" : item}
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 Blog List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))
              ) : (
                <p className="col-span-3 text-center">No Blogs Found</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default Blog;
