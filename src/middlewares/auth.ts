import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/error.class";
import jwt, { JwtPayload } from "jsonwebtoken";

import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import { jwt_access_secret } from "..";

export const auth = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //Check if token is present
    if (!token)
      throw new AppError(401, "UnAuthorized", "You are not authorized !");

    //Check if token is valid
    const decoded = jwt.verify(
      token,
      jwt_access_secret as string
    ) as JwtPayload;

    const { role, id, iat } = decoded;
    //Check if the user has permission
    const foundUser = await UserModel.isUserExist(id);

    if (!foundUser)
      throw new AppError(404, "Not Exist", "This user doesn't exist !");

    if (foundUser.status === "InActive")
      throw new AppError(403, "Forbidden", "This user is In-actice !");

    if (
      foundUser.passwordChangedAt &&
      UserModel.isJWTValidYet(foundUser.passwordChangedAt, iat as number)
    )
      throw new AppError(401, "UnAuthorized", "You are not authorized !");

    if (userRole && !userRole.includes(role))
      throw new AppError(401, "UnAuthorized", "You are not authorized !");

    req.user = decoded as JwtPayload;
    next();
  });
};
