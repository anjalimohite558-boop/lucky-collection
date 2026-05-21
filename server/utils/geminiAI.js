import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProductDetails = async (
  productName,
  imagePath
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const imageData = {
      inlineData: {
        data: fs.readFileSync(imagePath).toString("base64"),
        mimeType: "image/jpeg",
      },
    };

    const prompt = `
You are an AI fashion and ecommerce assistant.

Analyze this product image and product name.

Product Name:
${productName}

Generate:
1. category
2. professional ecommerce description
3. 5 tags

Return JSON only.

Example:
{
  "category": "Saree",
  "description": "Elegant silk saree perfect for weddings and festivals.",
  "tags": ["silk", "traditional", "wedding", "fashion", "women"]
}
`;

    const result = await model.generateContent([
      prompt,
      imageData,
    ]);

    const response = result.response.text();

    return JSON.parse(response);
  } catch (error) {
    console.log("GEMINI ERROR:", error);

    return {
      category: "Other",
      description: "Fashion product with attractive design.",
      tags: ["fashion"],
    };
  }
};