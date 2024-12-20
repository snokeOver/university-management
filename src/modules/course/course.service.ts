import { QueryBuilder } from "../../builder/QueryBuilder";
import { courseSearchFields } from "./course.constant";
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";

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
  const result = await CourseModel.findById(id);
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
  const result = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
