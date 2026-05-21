import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// ✅ POST - Save message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message saved successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("Contact Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET - Fetch all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ DELETE - Delete message by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;