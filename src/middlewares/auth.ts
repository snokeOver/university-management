import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/error.class";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt_secret } from "..";
import { TUserRole } from "../modules/user/user.interface";

export const auth = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //Chec if token is present
    if (!token)
      throw new AppError(401, "UnAuthorized", "You are not authorized !");

    //Chec if token is valid
    jwt.verify(token, jwt_secret as string, function (err, decoded) {
      // On error
      if (err)
        throw new AppError(401, "UnAuthorized", "You are not authorized !");

      // decoded undefined
      if (userRole && !userRole.includes((decoded as JwtPayload).role))
        throw new AppError(401, "UnAuthorized", "You are not authorized !");
      req.user = decoded as JwtPayload;
      next();
    });
  });
};
