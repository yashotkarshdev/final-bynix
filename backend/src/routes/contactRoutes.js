import express from "express";

import {
createContact,
getContacts,
deleteContact
} from "../controllers/contactController.js";

import {contactValidation} from "../middleware/contactValidation.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/contact",contactValidation,validate,createContact);

router.get("/contacts",protect,getContacts);

router.delete("/contacts/:id",protect,deleteContact);

export default router;