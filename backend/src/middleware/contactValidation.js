import { body } from "express-validator";

export const contactValidation = [

  body("name")
  .notEmpty().withMessage("Name required")
  .isLength({min:2,max:100}),

  body("email")
  .notEmpty().withMessage("Email required")
  .isEmail().withMessage("Invalid email"),

  body("phone")
  .optional()
  .isLength({min:6,max:20}),

  body("message")
  .notEmpty().withMessage("Message required")
  .isLength({min:10,max:2000})

];