import { jwt_secret } from "../..";
import { AppError } from "../../utils/error.class";
import { UserModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";

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
    userId: foundUser.id,
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
