import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/errorResponse';
import User from '../models/user.model';

interface AuthRequest extends Request {
  user?: { id: string; role: string; firebaseUid: string };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return errorResponse(res, 401, 'Not authorized, no token');
    }

    const decoded = jwt.decode(token) as { uid: string; email: string };
    if (!decoded) {
      return errorResponse(res, 401, 'Invalid token');
    }

    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      return errorResponse(res, 401, 'User not found');
    }

    req.user = { id: user._id.toString(), role: user.role, firebaseUid: decoded.uid };
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Not authorized');
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 403, 'Forbidden', 'You do not have permission to perform this action');
    }
    next();
  };
};