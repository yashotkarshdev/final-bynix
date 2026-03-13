import express from "express";

import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogBySlug
} from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { createBlogValidation } from "../middleware/blogValidation.js";

const router = express.Router();


// public routes
router.get("/blogs", getBlogs);

router.get("/blogs/:slug", getBlogBySlug);


// admin routes
router.post(
  "/blogs",
  protect,
  upload.single("image"),
  createBlogValidation,
  createBlog
);

router.put(
  "/blogs/:id",
  protect,
  upload.single("image"),
  updateBlog
);

router.delete(
  "/blogs/:id",
  protect,
  deleteBlog
);

export default router;