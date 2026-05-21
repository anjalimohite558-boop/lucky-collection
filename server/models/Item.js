import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    itemImage: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      default: "Other",
    },

    description: {
      type: String,
      default: "",
    },

    tags: [{ type: String }],

    aiRecommended: {
      type: Boolean,
      default: false,
    },

    // ✅ REQUIRED FOR SEMANTIC SEARCH
    embedding: {
      type: [Number],
      default: [],
    },

    // ✅ OPTIONAL (FOR TRENDING / RECOMMENDATION)
    popularityScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;