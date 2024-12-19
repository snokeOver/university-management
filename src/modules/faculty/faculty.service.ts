//This is the business logic

import { QueryBuilder } from "../../builder/QueryBuilder";
import { UserModel } from "../user/user.model";
import { facultySearchFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";

// Get all faculty data
export const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(FacultyModel.find(), query)
    .search(facultySearchFields)
    .filter()
    .sort()
    .paginate()
    .selectFields();

  const result = await facultyQuery.queryModel;

  return result;
};

// Get single faculty data
export const getSingleFacultyFromDB = async (facultyId: string) => {
  const result = await FacultyModel.findById(facultyId);

  return result;
};

// Update single faculty data by faculty id
export const updateSingleFacultyIntoDB = async (
  facultyId: string,
  payload: Partial<IFaculty>
) => {
  const { name, ...restfacultyData } = payload;

  const dataToSave: Record<string, unknown> = { ...restfacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      dataToSave[`name.${key}`] = value;
    }
  }

  const result = await FacultyModel.findByIdAndUpdate(facultyId, dataToSave, {
    new: true,
  });

  return result;
};

// Delete single faculty data by faculty id
export const deleteSingleFacultyFromDB = async (facultyId: string) => {
  const result = await UserModel.findByIdAndUpdate(
    facultyId,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};
