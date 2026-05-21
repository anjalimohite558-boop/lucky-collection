import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    favoriteCategories: [
      {
        category: String,
        count: Number,
      },
    ],

    favoriteTags: [
      {
        tag: String,
        count: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("UserPreference", userPreferenceSchema);