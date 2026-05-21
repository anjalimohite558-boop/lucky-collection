import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controller/orderController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER ROUTES
router.post("/create", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// ADMIN ROUTES
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/status/:id", protect, adminOnly, updateOrderStatus);

export default router;