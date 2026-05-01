import React from 'react'
import { useParams } from 'react-router';
import { getsingleBlog } from '../service/Blogservice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateBlog } from '../service/Blogservice';

const UpadetBlog = () => {
 const { id } = useParams();
 const navigate = useNavigate();

 const [formdata, setFormdata] = useState({
   title: "",
   content: "",
   category: "",
   image: null,
 });

 const [preview, setPreview] = useState("");

 // 🔥 fetch blog data
 useEffect(() => {
   const fetchBlog = async () => {
     try {
       const res = await getsingleBlog(id);
       const blog = res.blog;

       setFormdata({
         title: blog.title,
         content: blog.content,
         category: blog.category,
         image: null,
       });

       setPreview(blog.image); // old image
     } catch (err) {
       console.error(err);
     }
   };

   fetchBlog();
 }, [id]);

 // 🔥 handle change (text + file)
 const handleChange = (e) => {
   const { name, value, files } = e.target;

   if (files) {
     setFormdata({ ...formdata, [name]: files[0] });
     setPreview(URL.createObjectURL(files[0]));
   } else {
     setFormdata({ ...formdata, [name]: value });
   }
 };

 // 🔥 submit update
 const handleSubmit = async (e) => {
   e.preventDefault();

   const formData = new FormData();
   formData.append("title", formdata.title);
   formData.append("content", formdata.content);
   formData.append("category", formdata.category);

   if (formdata.image) {
     formData.append("image", formdata.image);
   }

   try {
     const res = await updateBlog(id, formData);

     if (res.status === true) {
       navigate("/admin");
     }
   } catch (err) {
     console.error(err);
   }
 };

 return (
   <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2]">
     <form
       onSubmit={handleSubmit}
       className="bg-[#f2efe6] text-gray-500 max-w-2xl w-full p-10 rounded-lg border border-[#e0dcd1] transition duration-300 hover:shadow-xl"
     >
       <h1 className="text-2xl font-bold text-center text-[#173626] mb-6">
         Edit Blog
       </h1>

       {/* Title */}
       <label htmlFor="title" className="font-medium text-[#173626]">
         Title
       </label>
       <input
         type="text"
         name="title"
         value={formdata.title}
         onChange={handleChange}
         placeholder="Enter title"
         className="w-full border mb-4 px-3 py-2 rounded border-[#e0dcd1] focus:outline-none focus:ring-2 focus:ring-[#173626] transition duration-200 focus:scale-[1.02]"
       />

       {/* Image */}
       <label htmlFor="image" className="font-medium text-[#173626]">
         Image
       </label>
       <input
         type="file"
         name="image"
         accept="image/*"
         onChange={handleChange}
         className="w-full border mb-4 px-3 py-2 rounded border-[#e0dcd1] focus:outline-none focus:ring-2 focus:ring-[#173626] transition duration-200 focus:scale-[1.02]"
       />

       {/* Preview */}
       {preview && (
         <img src={preview} className="w-full h-40 object-cover rounded mb-4" />
       )}

       {/* Category */}
       <select
         name="category"
         value={formdata.category}
         onChange={handleChange}
         className="w-full border mb-4 px-3 py-2 rounded border-[#e0dcd1] focus:outline-none focus:ring-2 focus:ring-[#173626] transition duration-200 focus:scale-[1.02]"
       >
         <option className="bg-[#f2efe6] choice:bg-[#173626] " value="">
           Select category
         </option>
         <option className="bg-[#f2efe6]" value="Community">
           Community
         </option>
         <option className="bg-[#f2efe6]" value="Education">
           Education
         </option>
         <option className="bg-[#f2efe6]" value="Culture">
           Culture
         </option>
         <option className="bg-[#f2efe6]" value="Technology">
           Technology
         </option>
       </select>

       {/* Content */}
       <label className="font-medium text-[#173626]">Content</label>
       <textarea
         name="content"
         value={formdata.content}
         onChange={handleChange}
         className="w-full border mb-4 px-3 py-2 rounded border-[#e0dcd1] focus:outline-none focus:ring-2 focus:ring-[#173626] transition duration-200 focus:scale-[1.02]"
       />

       {/* Button */}
       <button className="w-full bg-[#173626] text-white py-2 rounded hover:scale-105 transition">
         Update Blog
       </button>
     </form>
   </div>
 );
}
export default UpadetBlog