/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { envVariables } from "../../config/env";


const sanitizeError = (error: any) => {
  if (envVariables.NODE_ENV === "production") {
    return {
      message: error?.message || "Internal server error",
    };
  }

  return error;
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("🔥 Global Error:", err);

  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = err.message || "Something went wrong!";
  let error = err;


  if (err.code) {
    switch (err.code) {
      case "23505": 
        statusCode = httpStatus.CONFLICT;
        message = "Duplicate key value violates unique constraint";
        error = {
          constraint: err.constraint,
          detail: err.detail,
        };
        break;

      case "23503": 
        statusCode = httpStatus.BAD_REQUEST;
        message = "Foreign key constraint violation";
        error = {
          constraint: err.constraint,
          detail: err.detail,
        };
        break;

      case "23502": 
        statusCode = httpStatus.BAD_REQUEST;
        message = "Missing required field";
        error = {
          column: err.column,
          table: err.table,
        };
        break;

      case "22P02": 
        statusCode = httpStatus.BAD_REQUEST;
        message = "Invalid input syntax";
        error = err.detail;
        break;
    }
  }


  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = err;
  }

  const sanitizedError = sanitizeError(error);

  res.status(statusCode).json({
    success,
    message,
    error: sanitizedError,
  });
};

export default globalErrorHandler;
