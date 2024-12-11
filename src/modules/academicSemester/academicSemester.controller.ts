import { catchAsync } from "../../utils/catchAsync";
import {
  createAcademicSemesterToDB,
  getAAcademicSemesterFromDB,
  getALLAcademicSemesterFromDB,
  updateAAcademicSemesterToDB,
} from "./academicSemester.service";

export const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await createAcademicSemesterToDB(req.body);

  res.status(200).send({
    success: true,
    message: "Academic Semester created successfully!",
    data: result,
  });
});

export const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await getALLAcademicSemesterFromDB();

  res.status(200).send({
    success: true,
    message: "All Academic Semesters retrieved successfully!",
    data: result,
  });
});

export const getAAcademicSemester = catchAsync(async (req, res) => {
  const result = await getAAcademicSemesterFromDB(req.params.id);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Semester retrieved successfully!",
    data: result,
  });
});

export const updateAAcademicSemester = catchAsync(async (req, res) => {
  const result = await updateAAcademicSemesterToDB(req.params.id, req.body);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Semester updated successfully!",
    data: result,
  });
});
