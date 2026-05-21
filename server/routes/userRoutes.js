import express from "express";
import { registerUser, loginUser } from "../controller/UserController.js";
import { changePassword } from "../controller/changePasswordController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Change password route
router.put("/change-password", protect, changePassword);

export default router;