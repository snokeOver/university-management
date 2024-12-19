import { model, Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AppError } from "../../utils/error.class";

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

//To check if the academic faculty is already exist before create new one
academicFacultyScheme.pre("save", async function () {
  const isDepartmentExist = await AcademicFacultyModel.findOne({
    name: this.name,
  });

  if (isDepartmentExist)
    throw new AppError(
      409,
      "Duplicate Facuty",
      "This faculty is already exist !"
    );
});

//To check if the academic faculty is exist before update
academicFacultyScheme.pre("findOneAndUpdate", async function () {
  const isDepartmentExist = await AcademicFacultyModel.findOne(this.getQuery());
  if (!isDepartmentExist) throw new Error("Thid faculty doesn't exist");
});

export const AcademicFacultyModel = model<IAcademicFaculty>(
  "academicfaculties",
  academicFacultyScheme
);
