import mongoose from "mongoose";
import { IErrorResponse, IErrorSource } from "../types-interface/err";

export const handleCastError = (
  err: mongoose.Error.CastError
): IErrorResponse => {
  const status = 400;
  const sources: IErrorSource[] = [
    {
      path: err?.path,
      message: err.message,
    },
  ];

  return {
    status,
    message: "Invalid ID",
    sources,
  };
};
