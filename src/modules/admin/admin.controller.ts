//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

import { catchAsync } from "../../utils/catchAsync";
import {
  deleteSingleAadminFromDB,
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAadminIntoDB,
} from "./admin.service";

export const getAllAdmins = catchAsync(async (req, res) => {
  const result = await getAllAdminFromDB(req.query);

  res.status(200).send({
    success: true,
    message: "Admins data fetched successfully!",
    data: result,
  });
});

export const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleAdminFromDB(id);
  res.status(200).send({
    success: true,
    message: "Admin data fetched successfully!",
    data: result,
  });
});

export const updateSingleAdmin = catchAsync(async (req, res) => {
  const result = await updateSingleAadminIntoDB(req.params.id, req.body.admin);
  res.status(200).send({
    success: true,
    message: "Admin data Updated successfully!",
    data: result,
  });
});

export const deleteSingleAdmin = catchAsync(async (req, res) => {
  const result = await deleteSingleAadminFromDB(req.params.id);
  res.status(200).send({
    success: true,
    message: "Admin data Deleted successfully!",
    data: result,
  });
});
