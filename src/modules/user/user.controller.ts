//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

import { NextFunction, Request, Response } from "express";
// import { userValidation } from "./user.zod";
import { createStudentToDB } from "./user.service";

//Create a student data
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credentials, student } = req.body;

    // const validatedUser = userValidation.parse(user);

    const result = await createStudentToDB(credentials, student);
    res.status(200).send({
      success: true,
      message: "Student created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// export const getAllStudents = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const result = await getAllStudentDB();
//     res.status(200).send({
//       success: true,
//       message: "Students data fetched successfully!",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const result = await getAStudentDB(id);
//     res.status(200).send({
//       success: true,
//       message: "Student data fetched successfully!",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
