import { catchAsync } from "../../utils/catchAsync";
import { createAcademicSemesterToDB } from "./academicSemester.service";

export const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await createAcademicSemesterToDB(req.body);

  res.status(200).send({
    success: true,
    message: "Academic Semester created successfully!",
    data: result,
  });
});
