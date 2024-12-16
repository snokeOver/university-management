//This is the business logic

import { UserModel } from "../user/user.model";
import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";

// Get all student data
export const getAllStudentDB = async () => {
  const result = await StudentModel.find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFacultyId",
      },
    })
    .populate("academicSemister");

  return result;
};

// Get single student data
export const getAStudentDB = async (studentId: string) => {
  const result = await StudentModel.findOne({ studentId })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFacultyId",
      },
    })
    .populate("academicSemister");
  return result;
};

// Update single student data by student id
export const updateAStudentIntoDB = async (
  studentId: string,
  payload: Partial<IStudent>
) => {
  const { name, guardian, ...restStudentData } = payload;

  const dataToSave: Record<string, unknown> = { ...restStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      dataToSave[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      dataToSave[`guardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { studentId },
    dataToSave,
    {
      new: true,
    }
  );

  return result;
};

// Delete single student data by student id
export const deleteAStudentFromDB = async (studentId: string) => {
  const result = await UserModel.findOneAndUpdate(
    { id: studentId },
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};
