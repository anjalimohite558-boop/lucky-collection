import express from "express";
import { segmentUsers } from "../controller/segmentationController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin only
router.post("/segment", protect, adminOnly, segmentUsers);

export default router;