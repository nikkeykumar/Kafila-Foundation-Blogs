const blogModel = require("../models/blog.model");
const { uploadToCloudinary } = require("../utils/cloudnery");

// 🔥 readTime function
const calculateReadTime = (content) => {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const time = Math.ceil(words / 200);
  return `${time} min read`;
};
/**
 * @desc    Create a new blog
 * @route   POST /api/blogs
 * @access  Private (admin only)
 */
const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // 🔥 validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
        status: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
        status: false,
      });
    }

    // 🔥 upload image to cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // 🔥 readTime calculate
    const readTime = calculateReadTime(content);

    // 🔥 create blog
    const blog = await blogModel.create({
      title,
      content,
      category,
      image: result.secure_url, // ✅ cloud image
      author: req.user._id, // ✅ from auth middleware
      readTime,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
/**
 * @desc    Get all published blogs
 * @route   GET /api/blogs
 * @access  Public
 */
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({ isPublished: true }) // 🔥 sirf published
      .populate("author", "name email") // 👤 author info
      .sort({ createdAt: -1 }); // 🆕 latest first

    res.status(200).json({
      count: blogs.length,
      blogs,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

/**
 * @desc    Get blog by slug
 * @route   GET /api/blogs/:slug
 * @access  Public
 */

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await blogModel
      .findOne({ slug, isPublished: true }) // 🔥 slug + published
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        status: false,
      });
    }

    res.status(200).json({
      blog,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

/**
 * @desc    Delete a blog
 * @route   DELETE /api/blogs/:id
 * @access  Private (admin only)
 */
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        status: false,
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
/**
 * @desc    Get all blogs (admin)
 * @route   GET /api/blogs/admin
 * @access  Private (admin only)
 */
const getAllBlogsAdmin = async (req, res) => {
  try {
  
    const blogs = await blogModel.find()
       // 🔥 no filter
      .populate("author", "name email")
      .sort({ createdAt: -1 });
      

    res.status(200).json({
      blogs,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

/**
 * @desc    Update a blog
 * @route   PUT /api/blogs/:id
 * @access  Private (admin only)
 */

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPublished } = req.body;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        status: false,
      });
    }

    // ✅ safer updates
    if (title !== undefined) blog.title = title;

    if (content !== undefined) {
      blog.content = content;
      blog.readTime = calculateReadTime(content);
    }

    if (category !== undefined) {
      blog.category = category.trim();
    }

    if (isPublished !== undefined) {
      blog.isPublished = isPublished;
    }

    // 🔥 image update
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      blog.image = result.secure_url;
    }

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
const getsingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        status: false,
      });
    }

    res.status(200).json({
      blog,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  deleteBlog,
  getAllBlogsAdmin,
  updateBlog,
  getsingleBlog,
};
