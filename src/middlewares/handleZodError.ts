import { ZodError, ZodIssue } from "zod";
import { IErrorResponse, IErrorSource } from "../types-interface/err";

export const handleZodError = (err: ZodError): IErrorResponse => {
  const status = 422;
  const sources: IErrorSource[] = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue?.path.length - 1],
    message: issue?.message,
  }));

  return {
    status,
    message: "Validation Error",
    sources,
  };
};
