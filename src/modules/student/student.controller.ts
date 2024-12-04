//Controller only handle application logic: it takes the request, send the response and call the service function for database operation

import { NextFunction, Request, Response } from "express";
import {
  createStudentDB,
  getAllStudentDB,
  getAStudentDB,
} from "./student.service";
import { studentZodSchema } from "./student.zod";

// import { studentZodSchema } from "./student.zod.validation";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("hello");
    const { student } = req.body;

    studentZodSchema.parse(student);

    const result = await createStudentDB(student);
    res.status(200).send({
      success: true,
      message: "Student data created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllStudentDB();
    res.status(200).send({
      success: true,
      message: "Students data fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getAStudentDB(id);
    res.status(200).send({
      success: true,
      message: "Student data fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
