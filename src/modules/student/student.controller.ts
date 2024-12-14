//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

import { getAllStudentDB, getAStudentDB } from "./student.service";

import { catchAsync } from "../../utils/catchAsync";

export const getAllStudents = catchAsync(async (req, res) => {
  const result = await getAllStudentDB();
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
