import { Response } from 'express';

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errorMessage?: string,
  stack?: string
) => {
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: process.env.NODE_ENV === 'development' ? stack : undefined,
  });
};