import { catchAsync } from "../../utils/catchAsync";

import {
  createCourseIntoDB,
  deleteSingleCourseFromDB,
  getALLCourseFromDB,
  getSingleCourseFromDB,
  updateSingleCourseIntoDB,
} from "./course.service";

export const createCourse = catchAsync(async (req, res) => {
  const result = await createCourseIntoDB(req.body);

  res.status(200).send({
    success: true,
    message: "Academic Course created successfully!",
    data: result,
  });
});

export const getAllCourses = catchAsync(async (req, res) => {
  const result = await getALLCourseFromDB(req.query);

  res.status(200).send({
    success: true,
    message: "All Academic courses retrieved successfully!",
    data: result,
  });
});

export const getSingleCourse = catchAsync(async (req, res) => {
  const result = await getSingleCourseFromDB(req.params.id);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Course retrieved successfully!",
    data: result,
  });
});

export const deleteSingleCourse = catchAsync(async (req, res) => {
  const result = await deleteSingleCourseFromDB(req.params.id);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Course deleted successfully!",
    data: result,
  });
});

export const updateSingleCourse = catchAsync(async (req, res) => {
  const result = await updateSingleCourseIntoDB(req.params.id, req.body);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Course updated successfully!",
    data: result,
  });
});
