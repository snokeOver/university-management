import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AppError } from "../../middlewares/errorHandler";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
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

//To check if the academic department is already exist before create new one
academicDepartmentSchema.pre("save", async function () {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDepartmentExist)
    throw new AppError(
      409,
      "Already Exist",
      "Thid department is already exist"
    );
});

//To check if the academic department is exist before update
academicDepartmentSchema.pre("findOneAndUpdate", async function () {
  const isDepartmentExist = await AcademicDepartmentModel.findOne(
    this.getQuery()
  );
  if (!isDepartmentExist)
    throw new AppError(404, "Not Found", "Thid department doesn't exist");
});

export const AcademicDepartmentModel = model<IAcademicDepartment>(
  "academicdepartments",
  academicDepartmentSchema
);
