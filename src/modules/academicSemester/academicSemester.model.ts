import { model, Schema } from "mongoose";
import { IAcademicSemester } from "./academicSemester.type";
import {
  academicSemCode,
  academicSemName,
  months,
} from "./academicSemester.constants";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemName,
    },

    year: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: academicSemCode,
    },

    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
  }
);

export const AcademicSemesterMoel = model<IAcademicSemester>(
  "academicSemisters",
  academicSemesterSchema
);
