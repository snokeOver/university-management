import { z } from "zod";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { courseSearchFields } from "./course.constant";
import { ICourse, ICourseFaculties } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model";
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

      const currentData = await CourseModel.findById(id, "preRequisitCourses", {
        session,
      });

      const existingCourses = currentData?.preRequisitCourses.map(
        (el) => el.course
      );
      // Filter out courses that already exist
      const existingCourseIds = existingCourses?.map((id) => id.toString());

      // Filter out courses that already exist
      const uniqueNewPreRequisites = newPreRequisite.filter(
        (el) => !existingCourseIds?.includes(el.course.toString())
      );

      if (uniqueNewPreRequisites.length > 0) {
        const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              preRequisitCourses: { $each: uniqueNewPreRequisites },
            },
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

//Assign Faculties to DB
export const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseFaculties>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload.faculties } },
    },
    {
      upsert: true,
      new: true,
    }
  );

  return result;
};

//Remove Faculties to DB
export const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<ICourseFaculties>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload.faculties } },
    },
    {
      new: true,
    }
  );

  return result;
};
