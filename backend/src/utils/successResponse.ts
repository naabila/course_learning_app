import { Response } from 'express';

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};