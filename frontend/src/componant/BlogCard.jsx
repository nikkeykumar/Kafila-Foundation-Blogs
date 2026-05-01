import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
function BlogCard({ blog }) {
  return (
    <a
      href={`/blog/${blog.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="mb-3 inline-block text-xs px-3 py-1 bg-[#c47964] text-white rounded-full">
          {blog.category}
        </span>

        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-[#c47964] transition">
          {blog.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-green-900">
          <span className="flex items-center gap-1 ">
            <CiUser /> {blog.author?.name}
          </span>
          <span className="flex items-center gap-1 ">
            <CiCalendarDate />
            {blog.createdAt.slice(0, 10)}
          </span>
          <span className="flex items-center gap-1">
            {" "}
            <IoMdTime />
            {blog.readTime}
          </span>
        </div>
      </div>
    </a>
  );
}

export default BlogCard;
