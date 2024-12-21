import { model, Schema } from "mongoose";
import {
  ICourse,
  ICourseFaculties,
  IPrerequisitCourses,
} from "./course.interface";
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

export const CourseModel = model<ICourse>("courses", courseScheme);

const courseFacultyScheme = new Schema<ICourseFaculties>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "courses",
      required: [true, "Course missing"],
      unique: true,
    },
    faculties: [
      {
        type: Schema.Types.ObjectId,
        ref: "faculties",
      },
    ],
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const CourseFacultyModel = model<ICourseFaculties>(
  "coursefaculties",
  courseFacultyScheme
);
