// controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/UserModel";
import { AuthenticatedRequest } from "./Authmiddlewaret";

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
