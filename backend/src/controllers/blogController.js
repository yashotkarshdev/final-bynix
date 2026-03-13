import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import { generateSlug } from "../utils/slugify.js";

export const createBlog = async (req, res) => {

    try {

        const {
            title,
            excerpt,
            content,
            category,
            metaTitle,
            metaDescription
        } = req.body;

        if (!title || !excerpt || !content || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Blog image is required"
            });
        }

        const slug = generateSlug(title);

        const existing = await Blog.findOne({
            slug: { $regex: `^${slug}$`, $options: "i" }
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Blog with similar title already exists"
            });
        }

        const blog = await Blog.create({

            title,
            slug,
            excerpt,
            content,
            category,
            metaTitle,
            metaDescription,

            imageUrl: req.file.path,
            imagePublicId: req.file.filename

        });

        res.status(201).json({
            success: true,
            data: blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getBlogs = async (req, res) => {

    const blogs = await Blog
        .find()
        .sort({ createdAt: -1 })
        .select("-imagePublicId");

    res.json({
        success: true,
        data: blogs
    })

}

export const getBlogBySlug = async (req, res) => {

    const blog = await Blog.findOne({
        slug: req.params.slug
    })

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        })
    }

    res.json({
        success: true,
        data: blog
    })

}

export const updateBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const { title, excerpt, content, category } = req.body;

        blog.title = title;
        blog.excerpt = excerpt;
        blog.content = content;
        blog.category = category;

        // regenerate slug if title changes
        if (title && title !== blog.title) {
            blog.slug = generateSlug(title);
        }

        if (req.file) {

            // delete old cloudinary image
            if (blog.imagePublicId) {
                await cloudinary.uploader.destroy(blog.imagePublicId);
            }

            blog.imageUrl = req.file.path;
            blog.imagePublicId = req.file.filename;

        }

        await blog.save();

        res.json({
            success: true,
            data: blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // delete cloudinary image
        if (blog.imagePublicId) {
            await cloudinary.uploader.destroy(blog.imagePublicId);
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};