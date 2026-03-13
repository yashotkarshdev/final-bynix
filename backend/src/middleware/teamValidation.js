import { body } from "express-validator";

export const teamValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isLength({ min: 2 })
    .withMessage("Role must be at least 2 characters")
//     ,

//   body("image")
//     .notEmpty()
//     .withMessage("Image is required")
];