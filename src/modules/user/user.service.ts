//This is the business logic

import mongoose from "mongoose";
import { defPass } from "../..";
import { AcademicSemesterMoel } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AppError } from "../../middlewares/errorHandler";

// import { status } from "http-status";

// Create a student data
export const createStudentToDB = async (
  credentials: Partial<IUser>,
  student: IStudent
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const fetchedSem = await AcademicSemesterMoel.findById(
      student.academicSemister,
      null,
      { session }
    );

    if (!fetchedSem) throw new Error("Academic Semester not found!");

    const newUser: Partial<IUser> = {
      id: await generateStudentId(fetchedSem),
      password: credentials.password || defPass,
      email: credentials.email,
      role: "Student",
    };

    const createdUser = await UserModel.create([newUser], { session });

    if (!createdUser.length)
      throw new AppError(509, "Bad Request", "Failed to create user");

    student.studentId = createdUser[0].id;
    student.userId = createdUser[0]._id;

    const result = await StudentModel.create([student], { session });

    if (!result.length)
      throw new AppError(509, "Bad Request", "Failed to create new user");

    result[0].id = createdUser[0].id;

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
