import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../utils/error.class";
import { SemisterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { IOfferedCouse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

//Create a Offered Course to Database
export const createOfferedCouseIntoDB = async (payload: IOfferedCouse) => {
  //Check if semester registration id is exist
  const existedSemisterRegistration = await SemisterRegistrationModel.findById(
    payload.semesterRegistration
  );

  if (!existedSemisterRegistration)
    throw new AppError(400, "Bad Request", "Semester Registration not exist!");

  const academicSemester = existedSemisterRegistration.academicSemester;

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
  return null;
};

//Get all Offered Course from Database
export const getALLOfferedCouseFromDB = async (
  query: Record<string, unknown>
) => {
  const offeredCouseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .selectFields();

  const result = await offeredCouseQuery.queryModel;

  return result;
};

//Get a Offered Course by Id from Database
export const getSingleOfferedCouseFromDB = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
};

//Update a Offered Course by Id from Database
export const updateSinlgleOfferedCouseIntoDB = async (
  id: string,
  payload: Partial<IOfferedCouse>
) => {
  const result = await OfferedCourseModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
