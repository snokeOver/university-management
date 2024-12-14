//This is the business logic

import { StudentModel } from "./student.model";

// Get all student data
export const getAllStudentDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// Get all student data
export const getAStudentDB = async (studentId: string) => {
  const result = await StudentModel.findOne({ id: studentId });
  return result;
};
