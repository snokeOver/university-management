//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

// import { userValidation } from "./user.zod";
import { catchAsync } from "../../utils/catchAsync";
import { createStudentToDB } from "./user.service";

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
