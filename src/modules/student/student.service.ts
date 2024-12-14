//This is the business logic

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
  const result = await StudentModel.findById(studentId)
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFacultyId",
      },
    })
    .populate("academicSemister");
  return result;
};
