import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { createProfile } from '../services/stacksService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { stxAddress, username, bio } = req.body;

    const existingUser = await User.findOne({ $or: [{ stxAddress }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const txResult = await createProfile(stxAddress, username, bio);
    if (!txResult.success) {
      return res.status(500).json({ message: 'Failed to create profile on Stacks' });
    }

    const newUser: IUser = new User({
      stxAddress,
      username,
      bio,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Implement other user-related controller functions