import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    let photoUrl;

    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (photoUrl) updateData.photo = photoUrl;

    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

export default getCurrentUser;
