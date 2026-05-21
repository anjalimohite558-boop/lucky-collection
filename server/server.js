import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import orderRoutes from "./routes/orderRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRouter.js";
import contactRoutes from "./routes/contactRoutes.js"; // ✅ ADD THIS

import activityRoutes from "./routes/activityRoutes.js";
import segmentationRoutes from "./routes/segmentationRoutes.js";

dotenv.config();

const app = express();

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json()); // ✅ Better than bodyParser.json()
app.use(express.urlencoded({ extended: true })); // ✅ Better than bodyParser.urlencoded()

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", UserRouter);
app.use("/api/items", itemRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes); // ✅ ADD THIS
app.use("/api/activity", activityRoutes);
app.use("/api/ai", segmentationRoutes);

// PORT and MongoDB URI
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

// DB Connection
mongoose
  .connect(URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  })
  .catch((error) => {
    console.log("❌ DB Connection Error:", error);
  });