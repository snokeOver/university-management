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

academicSemesterSchema.pre("save", async function () {
  const isSemesterExists = await AcademicSemesterMoel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) throw new Error("Semester is alreay exist!");
});

export const AcademicSemesterMoel = model<IAcademicSemester>(
  "academicsemisters",
  academicSemesterSchema
);
