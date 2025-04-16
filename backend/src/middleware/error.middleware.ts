import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/errorResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = 'Something went wrong';
  let statusCode = 500;

  if (err.name === 'ValidationError') {
    message = 'Validation Error';
    statusCode = 400;
  } else if (err.name === 'CastError') {
    message = 'Cast Error';
    statusCode = 400;
  } else if (err.code === 11000) {
    message = 'Duplicate Entry';
    statusCode = 400;
  }

  errorResponse(res, statusCode, message, err.message, err.stack);
};