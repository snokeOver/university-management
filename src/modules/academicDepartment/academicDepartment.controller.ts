import { catchAsync } from "../../utils/catchAsync";
import {
  createAcademicDepartmentIntoDB,
  getAAcademicDepartmentFromDB,
  getALLAcademicDepartmentFromDB,
  updateAAcademicDepartmentIntoDB,
} from "./academicDepartment.service";

export const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await createAcademicDepartmentIntoDB(req.body);

  res.status(200).send({
    success: true,
    message: "Academic Department created successfully!",
    data: result,
  });
});

export const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await getALLAcademicDepartmentFromDB();

  res.status(200).send({
    success: true,
    message: "All Academic Faculties retrieved successfully!",
    data: result,
  });
});

export const getAAcademicDepartment = catchAsync(async (req, res) => {
  const result = await getAAcademicDepartmentFromDB(req.params.id);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Department retrieved successfully!",
    data: result,
  });
});

export const updateAAcademicDepartment = catchAsync(async (req, res) => {
  const result = await updateAAcademicDepartmentIntoDB(req.params.id, req.body);

  res.status(200).send({
    success: true,
    message: "Targeted Academic Department updated successfully!",
    data: result,
  });
});
