import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    contact: String,

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    // ✅ AI SEGMENTATION
    segment: {
      type: Number,
      default: -1, // -1 means not segmented yet
    },

    // ✅ USER STATS (helps segmentation + recommendations)
    totalSpent: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);