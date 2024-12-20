import { z } from "zod";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { courseSearchFields } from "./course.constant";
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";
import mongoose from "mongoose";
import { AppError } from "../../utils/error.class";

//Create a Academic Course to Database
export const createCourseIntoDB = async (payload: ICourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

//Get all Academic Course from Database
export const getALLCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("preRequisitCourses.course"),
    query
  )
    .search(courseSearchFields)
    .filter()
    .sort()
    .paginate()
    .selectFields();

  const result = await courseQuery.queryModel;
  return result;
};

//Get a Academic Course by Id from Database
export const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    "preRequisitCourses.course"
  );
  return result;
};

//Delete a Academic Course by Id from Database
export const deleteSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

//Update a Academic Course by Id from Database
export const updateSingleCourseIntoDB = async (
  id: string,
  payload: Partial<ICourse>
) => {
  const { preRequisitCourses, ...remainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedData = await CourseModel.findByIdAndUpdate(id, remainingData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updatedData)
      throw new AppError(409, "Bad Request", "Failed to update Course");

    //check if there is any pre-requisite course
    if (preRequisitCourses && preRequisitCourses.length > 0) {
      const deletePreRequisite = preRequisitCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisitCourses: { course: { $in: deletePreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedPreRequisiteCourses)
        throw new AppError(409, "Bad Request", "Failed to update Course");

      const newPreRequisite = preRequisitCourses.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisitCourses: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequisiteCourses)
        throw new AppError(409, "Bad Request", "Failed to update Course");
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id);

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
