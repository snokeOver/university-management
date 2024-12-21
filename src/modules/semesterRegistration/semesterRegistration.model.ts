import { model, Schema } from "mongoose";

import { ISemesterRegistration } from "./semesterRegistration.interface";
import { semisterStatus } from "./semesterRegistration.constants";
import { AcademicSemesterMoel } from "../academicSemester/academicSemester.model";
import { AppError } from "../../utils/error.class";

const semisterRegistrationScheme = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "academicsemisters",
      required: [true, "Academic Faculty name missing"],
      unique: true,
    },
    status: {
      type: String,
      enum: semisterStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endtDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

semisterRegistrationScheme.pre("save", async function () {
  //Check if there is any "ONGOING" | "UPCOMING" semister
  const isOngoingORUpcomingExsited = await SemisterRegistrationModel.findOne({
    $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
  });

  if (isOngoingORUpcomingExsited)
    throw new AppError(
      409,
      "Conflict",
      " 'ONGOING' or 'UPCOMING' Semester Registration already exist!"
    );

  //Check if the semister is already existed
  const isSemesterExists = await AcademicSemesterMoel.findById(
    this.academicSemester
  );

  if (!isSemesterExists)
    throw new AppError(400, "Bad Request", "Semester not exist!");

  //check if there the semister is already registered
  const isAlreadyRegistered = await SemisterRegistrationModel.findOne({
    academicSemester: this.academicSemester,
  });

  if (isAlreadyRegistered)
    throw new AppError(409, "Conflict", "Semester Registration already exist!");
});

semisterRegistrationScheme.pre("findOneAndUpdate", async function () {
  //check if there the semister is already ended
  const query = this.getQuery();
  const requestedSemister = await SemisterRegistrationModel.findById(query._id);

  if (requestedSemister?.status === "ENDED")
    throw new AppError(400, "Bad Request", "Semester alredy Ended!");

  const update = this.getUpdate();
  const payload = update as Partial<ISemesterRegistration>;
  if (
    payload &&
    payload?.status === "UPCOMING" &&
    requestedSemister?.status === "ONGOING"
  )
    throw new AppError(
      400,
      "Bad Request",
      `You can not change from ${requestedSemister?.status} to ${payload?.status}`
    );
});

export const SemisterRegistrationModel = model<ISemesterRegistration>(
  "semesterregistrations",
  semisterRegistrationScheme
);
