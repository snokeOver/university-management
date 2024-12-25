import { ErrorRequestHandler } from "express";

import { nodeEnv } from "..";

import { IErrorSource } from "../types-interface/err";
import { handleZodError } from "./handleZodError";
import { handleValidationError } from "./handleValidationError";
import { handleStrictMode } from "./handleStrictMode";
import { handleCastError } from "./handleCastError";
import { handleDuplicateError } from "./handleDuplicateError";
import { AppError } from "../utils/error.class";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let errorMsg = "Something Went Wrong!";
  let statusCode = error.statusCode || 500;

  let errSources: IErrorSource[] = [
    { path: "", message: "Something Went Wrong!" },
  ];

  // console.log(error);

  //Check for specific error
  if (error instanceof AppError) {
    //Errors we throw by AppError
    statusCode = error.statusCode;
    errorMsg = error.name;
    errSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error.name === "StrictModeError") {
    //Mongoose strict mode error
    const { status, message, sources } = handleStrictMode(error);

    statusCode = status;
    errorMsg = message;
    errSources = sources;
  } else if (error.code === 11000) {
    // Mongoose duplicate value for unique field
    const { status, message, sources } = handleDuplicateError(error);
    statusCode = status;
    errorMsg = message;
    errSources = sources;
  } else if (error.name === "ZodError") {
    //Zod validation error
    const { status, message, sources } = handleZodError(error);

    statusCode = status;
    errorMsg = message;
    errSources = sources;
  } else if (error.name === "ValidationError") {
    //Mongoose validation error
    const { status, message, sources } = handleValidationError(error);

    statusCode = status;
    errorMsg = message;
    errSources = sources;
  } else if (error.name === "CastError") {
    //Mongoose cast error for wrong params
    const { status, message, sources } = handleCastError(error);

    statusCode = status;
    errorMsg = message;
    errSources = sources;
  } else if (error instanceof Error) {
    //Errors we throw by AppError

    errorMsg = error.message;
    errSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else {
    errorMsg = error.message || "Server error";
  }

  const response = {
    success: false,
    message: errorMsg,
    errSources,
    showError: error,
    ...(nodeEnv === "development" && { stack: error?.stack }),
  };

  res.status(statusCode).send(response);
  void next;
};
