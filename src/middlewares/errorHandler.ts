import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error as Merr } from "mongoose";
import { nodeEnv } from "..";

export const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errMsg = "Server error";
  let statusCode = 500;
  let errorDetails = error.errors;

  //Check for specific error
  if (error.name === "NotFoundError") {
    errMsg = error.message;
    statusCode = 404;
  } else if (error.name === "StrictModeError") {
    const msg = error.message;
    errMsg = "Additional field not allowed";
    statusCode = 400;
    errorDetails = {
      error: msg.split(" ").slice(1).join(" "),
    };
  } else if (error instanceof Merr.ValidationError) {
    errMsg = "Validation failed";
    statusCode = 400;
  } else if (error.code === 11000) {
    errorDetails = error.errorResponse;
    errMsg = `Duplicate value for field: ${Object.keys(error.keyValue)[0]}`;
    statusCode = 409;
  } else {
    errMsg = error.message || "Server error";
  }

  const response = {
    message: errMsg,
    success: false,
    error: {
      name: error.name || "UnknownError",
      errors: errorDetails,
    },

    stack: nodeEnv === "development" ? error.stack : null,
  };

  res.status(statusCode).send(response);
  void next;
};

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
