//This is the business logic

import { UserModel } from "../user/user.model";
import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";

// Get all student data
export const getAllStudentDB = async (query: Record<string, unknown>) => {
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  const copiedQuery = { ...query };

  //query----------------------
  const { searchTerm } = query;

  const querryFields = ["email", "name.firstName", "presentAddress"];

  const searchQuery = searchTerm
    ? {
        $or: querryFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      }
    : {};

  const mySearch = StudentModel.find(searchQuery)
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFacultyId",
      },
    })
    .populate("academicSemister");

  //Filtering---------------------

  excludeFields.forEach((el) => delete copiedQuery[el]);

  const myFilter = mySearch.find(copiedQuery);

  //sorting -----------------------
  const sortQuery = query.sort ? (query.sort as string) : "-createdAt"; //Default sort based on createdAt

  const mySort = myFilter.sort(sortQuery);

  //Limiting and pagination--------------
  const limitQuery = query.limit ? (query.limit as number) : 1;
  const pageQuery = query.page ? (query.page as number) : 1;
  const skipQuery = query.page ? ((query.page as number) - 1) * limitQuery : 0;

  console.log({ query }, { copiedQuery });
  console.log(limitQuery, pageQuery, skipQuery);

  const myPagination = mySort.skip(skipQuery).limit(limitQuery);

  //Fields limiting

  const fieldsQuery = query.fields
    ? (query.fields as string).split(",").join(" ")
    : "-__v";

  const result = await myPagination.select(fieldsQuery);

  return result;
};

// Get single student data
export const getAStudentDB = async (studentId: string) => {
  const result = await StudentModel.findOne({ studentId })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFacultyId",
      },
    })
    .populate("academicSemister");
  return result;
};

// Update single student data by student id
export const updateAStudentIntoDB = async (
  studentId: string,
  payload: Partial<IStudent>
) => {
  const { name, guardian, ...restStudentData } = payload;

  const dataToSave: Record<string, unknown> = { ...restStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      dataToSave[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      dataToSave[`guardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { studentId },
    dataToSave,
    {
      new: true,
    }
  );

  return result;
};

// Delete single student data by student id
export const deleteAStudentFromDB = async (studentId: string) => {
  const result = await UserModel.findOneAndUpdate(
    { id: studentId },
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};
