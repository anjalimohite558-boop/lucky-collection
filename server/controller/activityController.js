import UserActivity from "../models/UserActivity.js";
import Item from "../models/Item.js";

export const trackActivity = async (req, res) => {
  try {
    const { userId, itemId, action } = req.body;

    if (!userId || !itemId || !action) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const score = action === "view" ? 1 : action === "cart" ? 2 : 3;

    await UserActivity.create({ userId, itemId, action, score });

    // increase popularity score
    await Item.findByIdAndUpdate(itemId, {
      $inc: { popularityScore: score },
    });

    res.json({ message: "Activity tracked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};