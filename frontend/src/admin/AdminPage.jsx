import React, { useEffect, useState } from "react";
import { adminGetAllBlogs } from "../service/Blogservice";
import { deleteBlog } from "../service/Blogservice";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../service/auth.service";

const AdminPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const data = await adminGetAllBlogs();
      console.log("Admin Blogs:", data);
      // API returns { blogs, status }
      setBlogs(data?.blogs ?? []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      // Remove the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

const handleLogout = async () => {
  try {
    await logoutUser(); // 🔥 pehle backend logout

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="bg-[#f7f6f2] min-h-screen">
      <nav className="bg-[#ffffff] px-3 fixed top-0 left-0 w-full z-50 ">
        <div className="max-w-7xl mx-auto py-3  md:py-5 flex justify-between items-center ">
          <h1 className="font-medium text-2xl text-green-900">ADMIN PANEL</h1>
          <div className="flex gap-5">
            <Link className="text-[#173626]  text-lg font-bold" to="/">
              Blog
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-25 py-2 active:scale-95 transition text-sm text-white rounded-full  bg-[#c47964] hover:bg-[#c47964]/90" 
            >
              <p className="mb-0.5">Logout</p>
            </button>
          </div>
        </div>
      </nav>
      <div className="pt-24 max-w-7xl mx-auto px-4">
        {/* ➕ Create Button */}
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold text-[#173626]">All Blogs</h2>

          <button
            type="button"
            className="w-25 py-2 active:scale-95 transition text-sm text-white rounded-full bg-[#173626] hover:bg-[#173626]/90"
            onClick={() => navigate(`/admin/blogs/create`)}
          >
            <p className="mb-0.5">Create Blog</p>
          </button>
        </div>

        {/* 📚 Blog List */}
        <div className="flex flex-wrap gap-2">
          {" "}
          {blogs.map((blog) => (
            <div className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
              {/* 🖼 Image */}
              <img
                className="rounded-md max-h-40 w-full object-cover"
                src={blog.image}
                alt={blog.title}
              />

              {/* 📌 Title */}
              <p className="text-gray-900 text-lg font-semibold mt-4 line-clamp-2">
                {blog.title}
              </p>

              {/* 🔘 Buttons (left-right) */}
              <div className="flex justify-between items-center mt-4">
                {/* Edit (Left) */}
                <button
                  onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
                  className="text-[#173626] hover:text-[#c47964] px-3 py-1 rounded-md 
      transition hover:scale-105 active:scale-95"
                >
                  Edit
                </button>

                {/* Delete (Right) */}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className=" text-[#173626]   hover:text-red-500 px-3 py-1 rounded-md 
      transition hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
