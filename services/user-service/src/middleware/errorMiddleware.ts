import { Response, Request, NextFunction } from 'express';

class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || process.env.INTERALERROR;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
}

export { AppError, errorHandler };