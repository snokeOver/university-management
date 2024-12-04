import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const response = {
    message: "API not found",
    success: false,
    error: "",
  };

  res.status(404).send(response);
  void next;
};
