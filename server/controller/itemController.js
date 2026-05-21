import Item from "../models/Item.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateEmbedding } from "../utils/embeddingHelper.js";
import similarity from "compute-cosine-similarity";

// =====================================
// GEMINI SETUP
// =====================================
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// =====================================
// SMART FALLBACK FUNCTION
// =====================================
const generateFallbackData = (itemName) => {

  const lower = itemName.toLowerCase();

  let category = "Fashion";

  let description =
    `${itemName} is a stylish fashion product suitable for modern occasions.`;

  let tags = [
    "fashion",
    "premium",
    "style",
    "trending",
  ];

  // LEHENGA
  if (lower.includes("lehenga")) {

    category = "Wedding Wear";

    description =
      "Elegant bridal lehenga with beautiful embroidery work perfect for weddings and festive celebrations.";

    tags = [
      "lehenga",
      "bridal",
      "wedding",
      "ethnic",
    ];
  }

  // KURTA
  else if (
    lower.includes("kurta") ||
    lower.includes("anarkali")
  ) {

    category = "Ethnic Wear";

    description =
      "Stylish ethnic kurta set designed with modern traditional fashion suitable for festivals and casual occasions.";

    tags = [
      "kurta",
      "ethnic",
      "traditional",
      "fashion",
    ];
  }

  // SHERWANI / BOYS
  else if (
    lower.includes("boy") ||
    lower.includes("sherwani") ||
    lower.includes("closet")
  ) {

    category = "Boys Ethnic Wear";

    description =
      "Premium boys traditional outfit with elegant embroidery ideal for weddings, functions, and festive occasions.";

    tags = [
      "boyswear",
      "traditional",
      "ethnic",
      "wedding",
    ];
  }

  // GOWN
  else if (lower.includes("gown")) {

    category = "Party Wear";

    description =
      "Beautiful designer gown with elegant modern styling suitable for parties and special events.";

    tags = [
      "gown",
      "partywear",
      "designer",
      "fashion",
    ];
  }

  // SAREE
  else if (
    lower.includes("saree") ||
    lower.includes("sari")
  ) {

    category = "Traditional Wear";

    description =
      "Elegant traditional saree with graceful design perfect for weddings, festivals, and cultural occasions.";

    tags = [
      "saree",
      "traditional",
      "ethnic",
      "festival",
    ];
  }

  return {
    category,
    description,
    tags,
    recommended: true,
  };
};

// =====================================
// AI PRODUCT DATA GENERATOR
// =====================================
const generateAIProductData = async (
  itemName
) => {

  try {

    // IF API KEY MISSING
    if (!process.env.GEMINI_API_KEY) {
      return generateFallbackData(itemName);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert AI fashion assistant.

Analyze this fashion product carefully.

Product Name:
"${itemName}"

Rules:
- Description MUST be specific to product
- Do NOT generate generic descriptions
- Category should match product
- Tags should be product related
- Return ONLY VALID JSON

Example:
{
  "category": "Wedding Wear",
  "description": "Elegant embroidered bridal lehenga perfect for weddings and festive occasions.",
  "tags": ["lehenga", "bridal", "wedding", "ethnic"],
  "recommended": true
}

NOW GENERATE FOR:
${itemName}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      await result.response;

    const text =
      response.text();

    console.log("RAW AI RESPONSE:");
    console.log(text);

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(cleanedText);

    return {
      category:
        parsed.category || "Fashion",

      description:
        parsed.description ||
        `${itemName} stylish fashion product`,

      tags:
        parsed.tags || [
          "fashion",
          "premium",
          "style",
          "trending",
        ],

      recommended:
        parsed.recommended ?? true,
    };

  } catch (error) {

    console.log(
      "AI GENERATION ERROR:",
      error.message
    );

    // ALWAYS USE SMART FALLBACK
    return generateFallbackData(itemName);
  }
};

// =====================================
// CREATE PRODUCT
// =====================================
export const createItem = async (
  req,
  res
) => {

  try {

    const {
      itemName,
      quantity,
      price,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required ❌",
      });
    }

    // AI DATA
    const aiData =
      await generateAIProductData(
        itemName
      );

    // EMBEDDING TEXT
    const textForEmbedding = `
      ${itemName}
      ${aiData.category}
      ${aiData.description}
      ${aiData.tags.join(" ")}
    `;

    // EMBEDDING
    const embedding =
      await generateEmbedding(
        textForEmbedding
      );

    // SAVE PRODUCT
    const item = new Item({
      itemName,
      quantity,
      price,

      category:
        aiData.category,

      description:
        aiData.description,

      tags:
        aiData.tags,

      aiRecommended:
        aiData.recommended,

      itemImage:
        req.file.filename,

      embedding,
    });

    await item.save();

    res.status(201).json({
      success: true,
      message:
        "Product created successfully ✅",
      item,
    });

  } catch (error) {

    console.log(
      "CREATE ITEM ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create product ❌",
    });
  }
};

// =====================================
// GET ALL PRODUCTS
// =====================================
export const getItems = async (
  req,
  res
) => {

  try {

    const items =
      await Item.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      items,
    });

  } catch (error) {

    console.log(
      "GET ITEMS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch items ❌",
    });
  }
};

// =====================================
// SEARCH PRODUCTS
// =====================================
export const searchItems =
  async (req, res) => {

    try {

      const { keyword } =
        req.query;

      const items =
        await Item.find({
          itemName: {
            $regex: keyword,
            $options: "i",
          },
        });

      res.status(200).json({
        success: true,
        items,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Search failed ❌",
      });
    }
  };

// =====================================
// RECOMMENDED PRODUCTS
// =====================================
export const getRecommendedItems =
  async (req, res) => {

    try {

      const items =
        await Item.find({
          aiRecommended: true,
        }).limit(8);

      res.status(200).json({
        success: true,
        items,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Recommendation failed ❌",
      });
    }
  };

// =====================================
// GET CATEGORY PRODUCTS
// =====================================
export const getItemsByCategory =
  async (req, res) => {

    try {

      const items =
        await Item.find({
          category:
            req.params.category,
        });

      res.status(200).json({
        success: true,
        items,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Category fetch failed ❌",
      });
    }
  };

// =====================================
// DELETE PRODUCT
// =====================================
export const deleteItem =
  async (req, res) => {

    try {

      await Item.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Product deleted ✅",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Delete failed ❌",
      });
    }
  };

// =====================================
// UPDATE PRODUCT
// =====================================
export const updateItem =
  async (req, res) => {

    try {

      const {
        itemName,
        quantity,
        price,
      } = req.body;

      const aiData =
        await generateAIProductData(
          itemName
        );

      const updatedData = {
        itemName,
        quantity,
        price,

        category:
          aiData.category,

        description:
          aiData.description,

        tags:
          aiData.tags,

        aiRecommended:
          aiData.recommended,
      };

      // NEW IMAGE
      if (req.file) {
        updatedData.itemImage =
          req.file.filename;
      }

      // NEW EMBEDDING
      const text = `
        ${itemName}
        ${aiData.category}
        ${aiData.description}
        ${aiData.tags.join(" ")}
      `;

      updatedData.embedding =
        await generateEmbedding(
          text
        );

      const updatedItem =
        await Item.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Item updated successfully ✅",
        item: updatedItem,
      });

    } catch (error) {

      console.log(
        "UPDATE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Update failed ❌",
      });
    }
  };

// =====================================
// SEMANTIC SEARCH
// =====================================
export const semanticSearchItems =
  async (req, res) => {

    try {

      const query =
        req.query.q;

      if (!query) {
        return res.status(400).json({
          success: false,
          message:
            "Query required ❌",
        });
      }

      const queryEmbedding =
        await generateEmbedding(
          query
        );

      const items =
        await Item.find();

      const scoredItems = [];

      for (const item of items) {

        if (
          !item.embedding ||
          item.embedding.length === 0
        ) {
          continue;
        }

        const score =
          similarity(
            queryEmbedding,
            item.embedding
          );

        scoredItems.push({
          item,
          score,
        });
      }

      scoredItems.sort(
        (a, b) =>
          b.score - a.score
      );

      const results =
        scoredItems
          .slice(0, 10)
          .map((x) => x.item);

      res.status(200).json({
        success: true,
        items: results,
      });

    } catch (error) {

      console.log(
        "SEMANTIC SEARCH ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Semantic search failed ❌",
      });
    }
  };

// =====================================
// GENERATE EMBEDDINGS FOR OLD PRODUCTS
// =====================================
export const generateEmbeddingsForAllItems =
  async (req, res) => {

    try {

      const items =
        await Item.find();

      for (const item of items) {

        const text = `
          ${item.itemName || ""}
          ${item.category || ""}
          ${item.description || ""}
          ${(item.tags || []).join(" ")}
        `;

        const embedding =
          await generateEmbedding(
            text
          );

        item.embedding =
          embedding;

        await item.save();
      }

      res.status(200).json({
        success: true,
        message:
          "Embeddings generated successfully ✅",
      });

    } catch (error) {

      console.log(
        "EMBEDDING ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Embedding generation failed ❌",
      });
    }
  };

// =====================================
// REGENERATE OLD PRODUCTS AI DATA
// =====================================
export const regenerateAllProductData =
  async (req, res) => {

    try {

      const items =
        await Item.find();

      for (const item of items) {

        const aiData =
          await generateAIProductData(
            item.itemName
          );

        item.category =
          aiData.category;

        item.description =
          aiData.description;

        item.tags =
          aiData.tags;

        item.aiRecommended =
          aiData.recommended;

        // REGENERATE EMBEDDING
        const embeddingText = `
          ${item.itemName}
          ${item.category}
          ${item.description}
          ${item.tags.join(" ")}
        `;

        item.embedding =
          await generateEmbedding(
            embeddingText
          );

        await item.save();
      }

      res.status(200).json({
        success: true,
        message:
          "All products regenerated successfully ✅",
      });

    } catch (error) {

      console.log(
        "REGENERATE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to regenerate products ❌",
      });
    }
  };