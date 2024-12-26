import { catchAsync } from "../../utils/catchAsync";
import {
  createAcademicFacultyIntoDB,
  getAAcademicFacultyFromDB,
  getALLAcademicFacultyFromDB,
  loginUserFromDB,
  updateAAcademicFacultyIntoDB,
} from "./auth.service";

export const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserFromDB(req.body);

  res.status(200).send({
    success: true,
    message: "Loin success!",
    data: result,
  });
});

// export const getAllAcademicFaculty = catchAsync(async (req, res) => {
//   const result = await getALLAcademicFacultyFromDB();

//   res.status(200).send({
//     success: true,
//     message: "All Academic Faculties retrieved successfully!",
//     data: result,
//   });
// });

// export const getAAcademicFaculty = catchAsync(async (req, res) => {
//   const result = await getAAcademicFacultyFromDB(req.params.id);

//   res.status(200).send({
//     success: true,
//     message: "Targeted Academic Faculty retrieved successfully!",
//     data: result,
//   });
// });

// export const updateAAcademicFaculty = catchAsync(async (req, res) => {
//   const result = await updateAAcademicFacultyIntoDB(req.params.id, req.body);

//   res.status(200).send({
//     success: true,
//     message: "Targeted Academic Faculty updated successfully!",
//     data: result,
//   });
// });
