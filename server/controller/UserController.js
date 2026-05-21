import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    let { name, email, contact, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const user = new User({ name, email, contact, password });
    await user.save();

    res.status(201).json({ message: "Registered ✅" });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed ❌" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    email = email.trim().toLowerCase();
    password = password.trim(); // ✅ IMPORTANT FIX

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user ? "YES" : "NO");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    console.log("DB PASSWORD HASH:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed ❌" });
  }
};