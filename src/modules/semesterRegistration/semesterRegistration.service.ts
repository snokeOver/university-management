import { QueryBuilder } from "../../builder/QueryBuilder";

import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemisterRegistrationModel } from "./semesterRegistration.model";

//Create a Semester Registration to Database
export const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration
) => {
  const result = await SemisterRegistrationModel.create(payload);
  return result;
};

//Get all Semester Registration from Database
export const getALLSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semisterRegistrationQuery = new QueryBuilder(
    SemisterRegistrationModel.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .selectFields();

  const result = await semisterRegistrationQuery.queryModel;

  return result;
};

//Get a Semester Registration by Id from Database
export const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemisterRegistrationModel.findById(id).populate(
    "academicSemester"
  );
  return result;
};

//Update a Semester Registration by Id from Database
export const updateSinlgleSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>
) => {
  const result = await SemisterRegistrationModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
