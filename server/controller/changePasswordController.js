import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect ❌" });
    }

    // ✅ IMPORTANT: Assign plain password (NOT hashed)
    // because model pre-save middleware will hash it automatically
    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully ✅" });
  } catch (error) {
    console.log("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ message: "Password change failed ❌" });
  }
};