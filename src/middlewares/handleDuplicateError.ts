import { MongoServerError } from "mongodb";
import { IErrorResponse, IErrorSource } from "../types-interface/err";

export const handleDuplicateError = (err: MongoServerError): IErrorResponse => {
  const status = 409;

  const sources: IErrorSource[] = [
    {
      path: Object.values(err.keyValue)[0] as string,
      message: `${Object.values(err.keyValue)[0]} is already exist!`,
    },
  ];

  return {
    status,
    message: "Invalid ID",
    sources,
  };
};
