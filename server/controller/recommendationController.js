import Item from "../models/Item.js";
import UserActivity from "../models/UserActivity.js";
import { cosineSimilarity } from "../utils/vectorUtils.js";

export const recommendItemsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const activities = await UserActivity.find({ userId }).populate("itemId");

    // fallback if no activity
    if (activities.length === 0) {
      const popular = await Item.find()
        .sort({ popularityScore: -1, createdAt: -1 })
        .limit(10);

      return res.status(200).json({ items: popular });
    }

    // Build user vector
    let userVector = null;
    let totalWeight = 0;

    for (let act of activities) {
      const item = act.itemId;

      if (!item || !item.embedding || item.embedding.length === 0) continue;

      const weight =
        act.action === "view" ? 1 : act.action === "cart" ? 2 : 3;

      if (!userVector) {
        userVector = [...item.embedding];
      } else {
        for (let i = 0; i < userVector.length; i++) {
          userVector[i] += item.embedding[i] * weight;
        }
      }

      totalWeight += weight;
    }

    // fallback if vector not possible
    if (!userVector || totalWeight === 0) {
      const popular = await Item.find()
        .sort({ popularityScore: -1, createdAt: -1 })
        .limit(10);

      return res.status(200).json({ items: popular });
    }

    // normalize
    for (let i = 0; i < userVector.length; i++) {
      userVector[i] = userVector[i] / totalWeight;
    }

    const allItems = await Item.find();

    const interactedItemIds = new Set(
      activities.map((a) => String(a.itemId?._id))
    );

    const recommended = allItems
      .filter((item) => !interactedItemIds.has(String(item._id)))
      .filter((item) => item.embedding && item.embedding.length > 0)
      .map((item) => {
        const simScore = cosineSimilarity(userVector, item.embedding);

        const finalScore =
          simScore * 0.8 + (item.popularityScore || 0) * 0.2;

        return { item, finalScore };
      })
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 10)
      .map((x) => x.item);

    return res.status(200).json({ items: recommended });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};