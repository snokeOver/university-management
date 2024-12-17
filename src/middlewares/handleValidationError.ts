import mongoose from "mongoose";
import { IErrorResponse, IErrorSource } from "../types-interface/err";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IErrorResponse => {
  const status = 422;
  const sources: IErrorSource[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: val?.path,
      message: val?.message,
    })
  );
  return {
    status,
    message: "Validation Error",
    sources,
  };
};
