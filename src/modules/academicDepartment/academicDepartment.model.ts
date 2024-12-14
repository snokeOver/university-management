import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentScheme = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, "Academic Department name missing"],
      unique: true,
    },

    academicFacultyId: {
      type: Schema.Types.ObjectId,
      ref: "academicfaculties",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const AcademicDepartmentModel = model<IAcademicDepartment>(
  "academicdepartments",
  academicDepartmentScheme
);
