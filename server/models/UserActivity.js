import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    action: {
      type: String,
      enum: ["view", "cart", "order"],
      required: true,
    },

    score: {
      type: Number,
      default: 1, // view=1, cart=2, order=3 etc.
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserActivity", userActivitySchema);