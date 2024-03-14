import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const createCurrentuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth0Id } = req.body;
  const existingUser = await User.findOne({ auth0Id });
  if (existingUser) {
    next({ message: "User Found", cause: 200 });
  }
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser.toObject())
};
