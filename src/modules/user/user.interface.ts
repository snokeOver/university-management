import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "Student" | "Admin" | "Faculty";
  status: "Active" | "InActive";
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser>;
  isPasswordMatched(password: string, hashedPass: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
