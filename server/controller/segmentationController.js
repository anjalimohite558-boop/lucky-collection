import User from "../models/User.js";
import Order from "../models/Order.js";
import { kmeans } from "../utils/kmeans.js";

export const segmentUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    if (users.length < 3) {
      return res.json({ message: "Not enough users for segmentation" });
    }

    const features = [];

    for (let user of users) {
      const orders = await Order.find({ user: user._id });

      let totalSpent = 0;
      let totalOrders = orders.length;

      for (let o of orders) {
        totalSpent += o.totalAmount || 0;
      }

      const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

      // Feature vector: [orders, spent, avg]
      features.push([totalOrders, totalSpent, avgOrderValue]);
    }

    const clusters = kmeans(features, 3, 15);

    // update user segments
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, {
        segment: clusters[i],
        totalSpent: features[i][1],
        totalOrders: features[i][0],
      });
    }

    res.json({ message: "Users segmented successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};