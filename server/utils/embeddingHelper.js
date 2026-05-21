import { pipeline } from "@xenova/transformers";

let extractor;

// Load embedding model once
const loadModel = async () => {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return extractor;
};

export const generateEmbedding = async (text) => {
  try {
    const model = await loadModel();

    const output = await model(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);

  } catch (error) {
    console.log("❌ Embedding Error:", error);

    return [];
  }
};