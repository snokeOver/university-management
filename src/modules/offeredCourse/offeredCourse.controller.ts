import { catchAsync } from "../../utils/catchAsync";
import { updateSingleAadminIntoDB } from "../admin/admin.service";
import {
  createOfferedCouseIntoDB,
  getALLOfferedCouseFromDB,
  getSingleOfferedCouseFromDB,
  updateSinlgleOfferedCouseIntoDB,
} from "./offeredCourse.service";

export const createOfferedCouse = catchAsync(async (req, res) => {
  const result = await createOfferedCouseIntoDB(req.body);

  res.status(200).send({
    success: true,
    message: "Offered Course created successfully!",
    data: result,
  });
});

export const getAllOfferedCouse = catchAsync(async (req, res) => {
  const result = await getALLOfferedCouseFromDB(req.query);

  res.status(200).send({
    success: true,
    message: "All Offered Course retrieved successfully!",
    data: result,
  });
});

export const getSingleOfferedCouse = catchAsync(async (req, res) => {
  const result = await getSingleOfferedCouseFromDB(req.params.id);

  res.status(200).send({
    success: true,
    message: "Targeted Offered Course retrieved successfully!",
    data: result,
  });
});

export const updateSingleOfferedCouse = catchAsync(async (req, res) => {
  const result = await updateSinlgleOfferedCouseIntoDB(req.params.id, req.body);

  res.status(200).send({
    success: true,
    message: "Targeted Offered Course updated successfully!",
    data: result,
  });
});
