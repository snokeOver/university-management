//This is the business logic

import { defPass } from "../..";
import { AcademicSemesterMoel } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

// Create a student data
export const createStudentToDB = async (
  credentials: Partial<IUser>,
  student: IStudent
) => {
  const fetchedSem = await AcademicSemesterMoel.findById(
    student.academicSemister
  );

  if (!fetchedSem) throw new Error("Academic Semester not found!");

  const newUser: Partial<IUser> = {
    id: await generateStudentId(fetchedSem),
    password: credentials.password || defPass,
    email: credentials.email,
    role: "Student",
  };

  const createdUser = await UserModel.create(newUser);

  if (createdUser) {
    student.studentId = createdUser.id;
    student.userId = createdUser._id;
  } else {
    throw new Error("Failed to create user");
  }

  const result = await StudentModel.create(student);
  result.id = createdUser.id;
  return result;
};
