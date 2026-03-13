import express from "express";
import {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam
} from "../controllers/teamController.js";

import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/team", getTeams);

router.post(
  "/team",
  protect,
  upload.single("image"),
  createTeam
);

router.put(
  "/team/:id",
  protect,
  upload.single("image"),
  updateTeam
);

router.delete(
  "/team/:id",
  protect,
  deleteTeam
);

export default router;