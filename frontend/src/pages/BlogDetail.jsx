import React, { useEffect, useState } from "react";
import Navebar from "../componant/Navebar";
import Footer from "../componant/Footer";
import { getBlogBySlug } from "../service/Blogservice";
import { useParams } from "react-router";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blogDatil, setBlogDatil] = useState(null);

  //    🔥 API Call
  useEffect(() => {
    fetchBlogs(slug);
  }, [slug]);

  const fetchBlogs = async (slug) => {
    try {
      const res = await getBlogBySlug(slug);
      console.log(res.blog);
      setBlogDatil(res.blog);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {" "}
      <Navebar />
      <main className="flex flex-col min-h-screen pt-20 bg-[#f7f6f2]">
        {/* 🔥 Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={blogDatil?.image}
            alt="Drug-Free Kashmir"
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* ✅ Overlay Fix */}
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(23,54,38,1)] via-[rgba(23,54,38,0.8)] to-transparent"></div>

          <div className="absolute inset-0 flex items-end max-w-7xl mx-auto ">
            <div className="container mx-auto px-4 pb-12">
              <span className="bg-[#c47964] backdrop-blur text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                Community
              </span>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight font-family-Georgia
animate-[fadeUp_0.5s_ease-out]"
              >
                {blogDatil?.title}
              </h1>
            </div>
          </div>
        </div>

        {/* 📢 Ad Section */}
        <div className="py-6 bg-[#f2efe6] border-b border-[#e0dcd1]">
          <div className="flex justify-center">
            <div id="ad-container" />
          </div>
        </div>

        {/* 📄 Blog Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 max-w-3xl">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-[#e0dcd1]">
                  <span className="flex items-center gap-2">
                    <CiUser className="text-xl" />
                    {blogDatil?.author?.name}
                  </span>

                  <span className="flex items-center gap-2">
                    <CiCalendarDate className="text-xl" />
                    {blogDatil?.createdAt.slice(0, 10)}
                  </span>

                  <span className="flex items-center gap-2">
                    <IoMdTime className="text-xl" />
                    {blogDatil?.readTime}
                  </span>
                </div>

                {/* Blog Content (Dynamic HTML) */}

                <div
                  className="
    prose prose-lg md:prose-xl max-w-none wrap-break-word

    prose-headings:font-family-Georgia
    prose-headings:text-[#173626]  prose-headings:uppercase
    prose-headings:my-3

    prose-p:text-[#173626]
    prose-p:leading-relaxed
    prose-p:mb-6
    
  
    prose-a:text-[#173626] prose-a:underline

    prose-img:rounded-xl prose-img:mx-auto prose-img:max-w-full

    prose-blockquote:border-l-4 prose-blockquote:border-[#c47964] prose-blockquote:pl-4 prose-blockquote:italic

    prose-pre:bg-slate-800 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto

    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-strong:text-[#173626]
    prose-strong:font-semibold
  "
                  dangerouslySetInnerHTML={{ __html: blogDatil?.content }}
                />
                <hr className="border-t border-[#e0dcd1]" />
                <p class="text-[#173626]  leading-relaxed  text-xl ">
                  <em>
                    For more information about Kafila Foundation's Drug-Free
                    Kashmir initiative or to get involved, contact us at
                  </em>
                  <a
                    href="mailto:info@kafilafoundation.org"
                    class=" underline-none font-medium  transition text-[#c47964]"
                  >
                    info@kafilafoundation.org
                  </a>

                  <em> or visit </em>

                  <a
                    href="http://www.kafilafoundation.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="  font-medium  transition underline-none text-[#c47964]"
                  >
                    www.kafilafoundation.org
                  </a>
                </p>
                {/* Author */}
                <div className="mt-12 p-6 bg-[#f2efe6] rounded-xl">
                  <h3 className="text-xl font-bold mb-2 text-[#173626]">
                    About the Author
                  </h3>
                  <p className="text-lg font-medium text-[#173626]">
                    {blogDatil?.author?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 📢 Ad Section */}
        <div className="py-6 bg-[#f2efe6] border border-[#e0dcd1]">
          <div className="flex justify-center">
            <div id="ad-container" />
          </div>
        </div>

        {/* 🔙 Back Button */}
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <button
            onClick={() => window.history.back()}
            className="border px-4 py-2 rounded-md hover:bg-[#c47964] hover:text-white transition border-[#e0dcd1] "
          >
            <span className="flex items-center gap-2">
              {" "}
              <FaArrowLeft /> Back to Blog
            </span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
