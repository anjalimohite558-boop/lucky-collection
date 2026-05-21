import Order from "../models/Order.js";

// USER CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty ❌" });
    }

    // total items
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // validate totalAmount
    const calculatedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const finalTotalAmount = totalAmount || calculatedTotal;

    const newOrder = new Order({
      user: req.user._id,
      items,
      totalItems,
      totalAmount: finalTotalAmount,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully ✅",
      order: newOrder,
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Order failed ❌" });
  }
};

// USER GET MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.log("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders ❌" });
  }
};

// ADMIN GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email contact role")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.log("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders ❌" });
  }
};

// ADMIN UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated ✅",
      order,
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Status update failed ❌" });
  }
};