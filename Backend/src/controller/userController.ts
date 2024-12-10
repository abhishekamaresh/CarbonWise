import User, { validateUserSchema } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

export const SignUp = async (req: Request, res: Response): Promise<void> => {
  const ValidateData = validateUserSchema.safeParse(req.body);

  if (!ValidateData.success) {
    res.status(400).json({ message: ValidateData.error.errors });
    return;
  }

  const { username, email, password } = ValidateData.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "New user created" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    if (!process.env.JWT_KEY) {
      console.error("JWT key is missing");
      res.status(500).json({ message: "Internal server configuration error" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      username: user.username,
      email: user.email,
      userId: user._id,
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
