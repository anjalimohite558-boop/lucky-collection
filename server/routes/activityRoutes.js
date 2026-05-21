import express from "express";
import { trackActivity } from "../controller/activityController.js";

const router = express.Router();

router.post("/track", trackActivity);

export default router;