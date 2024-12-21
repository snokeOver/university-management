import { catchAsync } from "../../utils/catchAsync";
import {
  createSemesterRegistrationIntoDB,
  getALLSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSinlgleSemesterRegistrationIntoDB,
} from "./semesterRegistration.service";

export const createSemisterRegistration = catchAsync(async (req, res) => {
  const result = await createSemesterRegistrationIntoDB(req.body);

  res.status(200).send({
    success: true,
    message: "Semister Registration created successfully!",
    data: result,
  });
});

export const getAllSemisterRegistration = catchAsync(async (req, res) => {
  const result = await getALLSemesterRegistrationFromDB();

  res.status(200).send({
    success: true,
    message: "All Semister Registration retrieved successfully!",
    data: result,
  });
});

export const getSingleSemisterRegistration = catchAsync(async (req, res) => {
  const result = await getSingleSemesterRegistrationFromDB(req.params.id);

  res.status(200).send({
    success: true,
    message: "Targeted Semister Registration retrieved successfully!",
    data: result,
  });
});

export const updateSingleSemisterRegistration = catchAsync(async (req, res) => {
  const result = await updateSinlgleSemesterRegistrationIntoDB(
    req.params.id,
    req.body
  );

  res.status(200).send({
    success: true,
    message: "Targeted Semister Registration updated successfully!",
    data: result,
  });
});
