import { body } from "express-validator";

export const createBlogValidation = [

  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("excerpt")
    .notEmpty()
    .withMessage("Excerpt required"),

  body("content")
    .notEmpty()
    .withMessage("Content required"),

  body("category")
    .notEmpty()
    .withMessage("Category required"),

  body("metaTitle")
    .notEmpty()
    .withMessage("Meta title required"),

  body("metaDescription")
    .notEmpty()
    .withMessage("Meta description required")

];