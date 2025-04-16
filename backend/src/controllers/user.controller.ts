import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { errorResponse } from '../utils/errorResponse';
import { successResponse } from '../utils/successResponse';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firebaseUid, name, email, role } = req.body;

    if (!['student', 'teacher'].includes(role)) {
      return errorResponse(res, 400, 'Invalid role');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, 'Duplicate Entry', 'Email already exists');
    }

    const user = await User.create({ firebaseUid, name, email, role });

    successResponse(res, 201, 'User registered successfully', user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firebaseUid } = req.params;
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }
    successResponse(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};