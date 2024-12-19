//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

// import { userValidation } from "./user.zod";
import { catchAsync } from "../../utils/catchAsync";
import {
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentToDB,
  deleteSingleStudentFromDB,
} from "./user.service";

//Create a student data
export const createStudent = catchAsync(async (req, res) => {
  const { credentials, student } = req.body;

  const result = await createStudentToDB(credentials, student);
  res.status(200).send({
    success: true,
    message: "Student created successfully!",
    data: result,
  });
});

//Create a Faculty data
export const createFaculty = catchAsync(async (req, res) => {
  const { credentials, faculty } = req.body;

  const result = await createFacultyIntoDB(credentials, faculty);
  res.status(200).send({
    success: true,
    message: "Faculty created successfully!",
    data: result,
  });
});

//Create a Admin data
export const createAdmin = catchAsync(async (req, res) => {
  const { credentials, admin } = req.body;

  const result = await createAdminIntoDB(credentials, admin);
  res.status(200).send({
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

//Delete a student data
export const deleteSingleStudent = catchAsync(async (req, res) => {
  const result = await deleteSingleStudentFromDB(req.params.id);
  res.status(200).send({
    success: true,
    message: "Student deleted successfully!",
    data: result,
  });
});
