//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

import {
  deleteAStudentFromDB,
  getAllStudentDB,
  getAStudentDB,
  updateAStudentIntoDB,
} from "./student.service";

import { catchAsync } from "../../utils/catchAsync";

export const getAllStudents = catchAsync(async (req, res) => {
  const result = await getAllStudentDB(req.query);
  res.status(200).send({
    success: true,
    message: "Students data fetched successfully!",
    data: result,
  });
});

export const getAStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getAStudentDB(id);
  res.status(200).send({
    success: true,
    message: "Student data fetched successfully!",
    data: result,
  });
});

export const updateAStudent = catchAsync(async (req, res) => {
  const result = await updateAStudentIntoDB(req.params.id, req.body.student);
  res.status(200).send({
    success: true,
    message: "Student data Updated successfully!",
    data: result,
  });
});

export const deleteAStudent = catchAsync(async (req, res) => {
  const result = await deleteAStudentFromDB(req.params.id);
  res.status(200).send({
    success: true,
    message: "Student data Deleted successfully!",
    data: result,
  });
});
