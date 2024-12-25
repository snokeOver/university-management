import { model, Schema } from "mongoose";

import { Days } from "./offeredCourse.constants";

import { AppError } from "../../utils/error.class";
import { IOfferedCouse } from "./offeredCourse.interface";

import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import { SemisterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";

const offeredCourseSchema = new Schema<IOfferedCouse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "semesterregistrations",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicsemisters",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicfaculties",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicdepartments",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "courses",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "faculties",
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

offeredCourseSchema.pre("save", async function () {
  const {
    days,
    startTime,
    endTime,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    semesterRegistration,
  } = this;

  //Check if academic faculty id is exist
  const existedAcademicFaculty = await AcademicFacultyModel.findById(
    academicFaculty
  );

  if (!existedAcademicFaculty)
    throw new AppError(400, "Bad Request", "Academic Faculty not exist!");

  //Check if academic department id is exist
  const existedAcademicDepartment = await AcademicDepartmentModel.findById(
    academicDepartment
  );

  if (!existedAcademicDepartment)
    throw new AppError(400, "Bad Request", "Academic Department not exist!");

  //Check if course id is exist
  const existedCourse = await CourseModel.findById(course);

  if (!existedCourse)
    throw new AppError(400, "Bad Request", "Course not exist!");

  //Check if Faculty id is exist
  const existedFaculty = await FacultyModel.findById(faculty);

  if (!existedFaculty)
    throw new AppError(400, "Bad Request", "Faculty not exist!");

  //Check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    academicFacultyId: academicFaculty,
  });

  if (!isDepartmentBelongToFaculty)
    throw new AppError(
      400,
      "Bad Request",
      "This department doesn't belong to this faculty!"
    );

  //Get the schedules of the faculties
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule))
    throw new AppError(
      409,
      "Conflict",
      "This faculty isn't available at that time. Choose other time or day"
    );
});

//Pre hook before update
offeredCourseSchema.pre("findOneAndUpdate", async function () {
  //check if there the semister is already ended
  const query = this.getQuery();
  const update = this.getUpdate();
  const payload = update as Pick<
    IOfferedCouse,
    "faculty" | "days" | "startTime" | "endTime"
  >;

  const { faculty, days, startTime, endTime } = payload;

  //Check if offered Course is exist
  const existOfferedCourse = await OfferedCourseModel.findById(query._id);

  if (!existOfferedCourse)
    throw new AppError(400, "Bad Request", "Offered Course not exist!");

  //Check if Faculty id is exist
  const existedFaculty = await FacultyModel.findById(payload.faculty);

  if (!existedFaculty)
    throw new AppError(400, "Bad Request", "Faculty not exist!");

  const semesterRegistration = existOfferedCourse.semesterRegistration;

  const semesterRegistrationStatus = await SemisterRegistrationModel.findById(
    semesterRegistration
  );
  if (semesterRegistrationStatus?.status !== "UPCOMING")
    throw new AppError(
      400,
      "Bad Request",
      `Update Failed as it is ${semesterRegistrationStatus?.status}"`
    );

  //Get the schedules of the faculties
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule))
    throw new AppError(
      409,
      "Conflict",
      "This faculty isn't available at that time. Choose other time or day"
    );
});

export const OfferedCourseModel = model<IOfferedCouse>(
  "offeredcourse",
  offeredCourseSchema
);
