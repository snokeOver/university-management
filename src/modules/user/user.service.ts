//This is the business logic

import mongoose from "mongoose";
import { defPass } from "../..";
import { AcademicSemesterMoel } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import { AppError } from "../../utils/error.class";
import { IAdmin } from "../admin/admin.interface";
import { AdminModel } from "../admin/admin.model";
import { IFaculty } from "../faculty/faculty.interface";
import { FacultyModel } from "../faculty/faculty.model";

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

// Create a Faculty data
export const createFacultyIntoDB = async (
  credentials: Partial<IUser>,
  faculty: IFaculty
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser: Partial<IUser> = {
      id: await generateFacultyId(),
      password: credentials.password || defPass,
      email: credentials.email,
      role: "Faculty",
    };

    const createdUser = await UserModel.create([newUser], { session });

    if (!createdUser.length)
      throw new AppError(509, "Bad Request", "Failed to create user");

    faculty.facultyId = createdUser[0].id;
    faculty.userId = createdUser[0]._id;

    const result = await FacultyModel.create([faculty], { session });

    if (!result.length)
      throw new AppError(509, "Bad Request", "Failed to create new Faculty");

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

// Create a Admin data
export const createAdminIntoDB = async (
  credentials: Partial<IUser>,
  admin: IAdmin
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser: Partial<IUser> = {
      id: await generateAdminId(),
      password: credentials.password || defPass,
      email: credentials.email,
      role: "Admin",
    };

    const createdUser = await UserModel.create([newUser], { session });

    if (!createdUser.length)
      throw new AppError(509, "Bad Request", "Failed to create user");

    admin.adminId = createdUser[0].id;
    admin.userId = createdUser[0]._id;

    const result = await AdminModel.create([admin], { session });

    if (!result.length)
      throw new AppError(509, "Bad Request", "Failed to create new Admin");

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

//delete a student from database
export const deleteSingleStudentFromDB = async (id: string) => {
  const deletedStudent = await UserModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return deletedStudent;
};
