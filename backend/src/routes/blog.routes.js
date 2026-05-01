const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewere/auth.middleware");
const singleUpload = require("../middlewere/multer");

// create blog only admin can create blog
router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  singleUpload,
  blogController.createBlog,
);

// get all blogs
router.get("/", blogController.getAllBlogs);

// get all blogs admin can get all blogs
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  blogController.getAllBlogsAdmin,
);

// get blog by slug
router.get("/:slug", blogController.getBlogBySlug);

// delete blog only admin can delete blog
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  blogController.deleteBlog,
);

// update blog only admin can update blog
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  singleUpload,
  blogController.updateBlog,
);

router.get("/single/:id", blogController.getsingleBlog);
module.exports = router;
