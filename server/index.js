import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import UserRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRouter.js";
import path from "path";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on Port: " + PORT);
    });
  })
  .catch((error) => console.log(error));

app.use("/api/users", UserRouter);

// static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// FIXED ROUTE
app.use("/api/items", itemRouter);