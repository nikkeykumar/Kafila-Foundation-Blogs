import React, { useState } from "react";
import { createBlog } from "../service/Blogservice";
import { useNavigate } from "react-router";

const CreatBlog = () => {
    const navegate = useNavigate();
  const [formdata, setFormdata] = useState({
    title: "",
    image: null,
    category: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  const handleFileChange = (e) => {
    setFormdata({ ...formdata, image: e.target.files[0] });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(formdata);
    const formData = new FormData();
    formData.append("title", formdata.title);
    formData.append("category", formdata.category);
    formData.append("content", formdata.content);
    formData.append("image", formdata.image);

    const res = await createBlog(formData);
        navegate("/admin");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f2efe6] text-gray-500 max-w-2xl w-full p-10 text-sm rounded-lg border border-[#e0dcd1] transition duration-300 hover:shadow-xl"
      >
        <div className="pb-4">
          <h1 className="text-center text-2xl font-bold text-[#173626]">
            Create Blog
          </h1>
        </div>

        {/* Title */}
        <label className="font-medium text-[#173626]">Blog Title</label>
        <input
          type="text"
          name="title"
          value={formdata.title}
          onChange={handleChange}
          className="w-full border mt-1.5 mb-4 rounded py-2.5 px-3  border-[#e0dcd1]
            focus:outline-none focus:ring-2 focus:ring-[#173626]
            transition duration-200 focus:scale-[1.02] "
          placeholder="Enter title"
          required
        />

        {/* Image URL */}
        <label className="font-medium text-[#173626]">Image </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          className="w-full border mt-1.5 mb-4  rounded py-2.5 px-3 border-[#e0dcd1]
            focus:outline-none focus:ring-2 focus:ring-[#173626]
            transition duration-200 focus:scale-[1.02] "
          placeholder="Paste image link"
        />

        {/* Category */}
        <label className="font-medium text-[#173626]">Category</label>
        <select
          name="category"
          value={formdata.category}
          onChange={handleChange}
          className="w-full border mt-1.5 mb-4 border-[#e0dcd1]
            focus:outline-none focus:ring-2 focus:ring-[#173626]
            transition duration-200 focus:scale-[1.02] rounded py-2.5 px-3 "
        >
          <option value="">Select category</option>
          <option value="Community">Community</option>
          <option value="Education">Education</option>
          <option value="Culture">Culture</option>
          <option value="Technology">Technology</option>
        </select>

        {/* Content */}
        <label className="font-medium text-[#173626]">Content</label>
        <textarea
          name="content"
          value={formdata.content}
          onChange={handleChange}
          rows="4"
          className="w-full resize-none border mt-1.5 border-[#e0dcd1]
            focus:outline-none focus:ring-2 focus:ring-[#173626]
            transition duration-200 focus:scale-[1.02] rounded py-2.5 px-3"
          placeholder="Enter content"
          required
        />

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button className="w-full bg-[#173626] text-white py-2 rounded hover:scale-105 transition">
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatBlog;
