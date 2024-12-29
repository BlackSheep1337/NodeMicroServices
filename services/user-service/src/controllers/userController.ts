import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import { AppError } from "../middleware/errorMiddleware";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(new AppError("Failed to fetch users", 500));
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return next(new AppError("User ID is required", 400));
    }

    const user = await User.findById(userID);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new AppError("Name and Email are required", 400));
    }

    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const userID = req.params.id;

    if (!name || !email) {
      return next(new AppError("Name and Email are required", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return next(new AppError("User ID is required", 400));
    }

    const deletedUser = await User.findByIdAndDelete(userID);
    if (!deletedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
