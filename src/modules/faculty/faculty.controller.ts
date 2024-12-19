//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

import { catchAsync } from "../../utils/catchAsync";
import {
  deleteSingleFacultyFromDB,
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyIntoDB,
} from "./faculty.service";

export const getAllFaculties = catchAsync(async (req, res) => {
  const result = await getAllFacultyFromDB(req.query);
  res.status(200).send({
    success: true,
    message: "Faculties data fetched successfully!",
    data: result,
  });
});

export const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleFacultyFromDB(id);
  res.status(200).send({
    success: true,
    message: "Faculty data fetched successfully!",
    data: result,
  });
});

export const updateSingleFaculty = catchAsync(async (req, res) => {
  const result = await updateSingleFacultyIntoDB(
    req.params.id,
    req.body.faculty
  );
  res.status(200).send({
    success: true,
    message: "Faculty data Updated successfully!",
    data: result,
  });
});

export const deleteSingleFaculty = catchAsync(async (req, res) => {
  const result = await deleteSingleFacultyFromDB(req.params.id);
  res.status(200).send({
    success: true,
    message: "Faculty data Deleted successfully!",
    data: result,
  });
});
