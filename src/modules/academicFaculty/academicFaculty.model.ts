import { model, Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultyScheme = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, "Academic Faculty name missing"],
      unique: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const AcademicFacultyModel = model<IAcademicFaculty>(
  "academicfaculties",
  academicFacultyScheme
);
