import { Model } from "mongoose";

export interface IUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  role: "Student" | "Admin" | "Faculty";
  status: "Active" | "InActive";
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser>;
  isPasswordMatched(password: string, hashedPass: string): Promise<boolean>;
}
