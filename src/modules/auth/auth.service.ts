import { jwt_secret, saltRound } from "../..";
import { AppError } from "../../utils/error.class";

import { UserModel } from "../user/user.model";
import { IChangeUserPassword, ILoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

//Authenticate User Login
export const loginUserFromDB = async (payload: ILoginUser) => {
  const foundUser = await UserModel.isUserExist(payload.id);

  if (!foundUser)
    throw new AppError(404, "Not Exist", "This user doesn't exist !");

  if (foundUser.status === "InActive")
    throw new AppError(403, "Forbidden", "This user is In-actice !");

  // //password check
  if (
    !(await UserModel.isPasswordMatched(payload.password, foundUser.password))
  )
    throw new AppError(403, "Forbidden", "Passowrd Not matched !");

  const jwtPayload = {
    id: foundUser.id,
    email: foundUser.email,
    role: foundUser.role,
  };
  const accessToken = jwt.sign(jwtPayload, jwt_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needPassChange: foundUser.needPasswordChange,
  };
};

//Authenticate User Login
export const changePasswordIntoDB = async (
  payload: IChangeUserPassword,
  authData: JwtPayload
) => {
  const foundUser = await UserModel.isUserExist(authData.id);

  if (!foundUser)
    throw new AppError(404, "Not Exist", "This user doesn't exist !");

  if (foundUser.status === "InActive")
    throw new AppError(403, "Forbidden", "This user is In-actice !");

  // //password check
  if (
    !(await UserModel.isPasswordMatched(
      payload.oldPassword,
      foundUser.password
    ))
  )
    throw new AppError(403, "Forbidden", "Passowrd Not matched !");

  const hashedPass = await bcrypt.hash(payload.newPassword, Number(saltRound));

  const result = await UserModel.findOneAndUpdate(
    {
      id: authData.id,
      role: authData.role,
    },
    {
      password: hashedPass,
      needPasswordChange: false,
    },
    {
      new: true,
    }
  );

  void result;
  return null;
};
