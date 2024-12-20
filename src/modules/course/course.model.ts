import { model, Schema } from "mongoose";
import { ICourse, IPrerequisitCourses } from "./course.interface";
// import { AppError } from "../../utils/error.class";

const preRequisitCoursesSchema = new Schema<IPrerequisitCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "courses",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseScheme = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title missing"],
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      trim: true,
    },
    preRequisitCourses: [preRequisitCoursesSchema],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

//To check if the academic faculty is already exist before create new one
// academicFacultyScheme.pre("save", async function () {
//   const isDepartmentExist = await AcademicFacultyModel.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExist)
//     throw new AppError(
//       409,
//       "Duplicate Facuty",
//       "This faculty is already exist !"
//     );
// });

//To check if the academic faculty is exist before update
// academicFacultyScheme.pre("findOneAndUpdate", async function () {
//   const isDepartmentExist = await AcademicFacultyModel.findOne(this.getQuery());
//   if (!isDepartmentExist) throw new Error("Thid faculty doesn't exist");
// });

export const CourseModel = model<ICourse>("courses", courseScheme);
