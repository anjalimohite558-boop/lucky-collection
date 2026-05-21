import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

import {
  createItem,
  getItems,
  deleteItem,
  updateItem,
  getRecommendedItems,
  getItemsByCategory,
  searchItems,
  semanticSearchItems,
  generateEmbeddingsForAllItems,
  regenerateAllProductData,
} from "../controller/itemController.js";

import { recommendItemsForUser } from "../controller/recommendationController.js";

const router = express.Router();

// =====================================
// SEMANTIC SEARCH
// =====================================
router.get(
  "/semantic-search",
  semanticSearchItems
);

// =====================================
// GENERATE EMBEDDINGS
// =====================================
router.get(
  "/generate-embeddings",
  generateEmbeddingsForAllItems
);

// =====================================
// REGENERATE AI DATA
// =====================================
router.get(
  "/regenerate-ai-data",
  regenerateAllProductData
);

// =====================================
// AI RECOMMENDATION
// =====================================
router.get(
  "/recommend/:userId",
  recommendItemsForUser
);

// =====================================
// CREATE PRODUCT
// =====================================
router.post(
  "/create",
  upload.single("itemImage"),
  createItem
);

// =====================================
// GET ALL PRODUCTS
// =====================================
router.get(
  "/",
  getItems
);

// =====================================
// GET RECOMMENDED PRODUCTS
// =====================================
router.get(
  "/recommended",
  getRecommendedItems
);

// =====================================
// GET CATEGORY PRODUCTS
// =====================================
router.get(
  "/category/:category",
  getItemsByCategory
);

// =====================================
// NORMAL SEARCH
// =====================================
router.get(
  "/search/item",
  searchItems
);

// =====================================
// DELETE PRODUCT
// =====================================
router.delete(
  "/:id",
  deleteItem
);

// =====================================
// UPDATE PRODUCT
// =====================================
router.put(
  "/:id",
  upload.single("itemImage"),
  updateItem
);

export default router;