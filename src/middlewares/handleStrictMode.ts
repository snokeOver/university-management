import mongoose from "mongoose";
import { IErrorResponse, IErrorSource } from "../types-interface/err";

export const handleStrictMode = (
  err: mongoose.Error.StrictModeError
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
    message: "Additional field not allowed",
    sources,
  };
};
