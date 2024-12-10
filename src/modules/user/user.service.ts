//This is the business logic

import { defPass } from "../..";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// Create a student data
export const createStudentToDB = async (
  credentials: Partial<IUser>,
  student: IStudent
) => {
  const newUser: Partial<IUser> = {
    id: "202400125",
    password: credentials.password || defPass,
    email: credentials.email,
    role: "Student",
  };

  const createdUser = await UserModel.create(newUser);

  if (createdUser) {
    student.userId = createdUser._id;
  } else {
    throw new Error("Failed to create user");
  }

  const result = await StudentModel.create(student);

  return result;
};
