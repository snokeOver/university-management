import { IAcademicFaculty } from "./academicDepartment.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

//Create a Academic Semester to Database
export const createAcademicFacultyIntoDB = async (
  payload: IAcademicFaculty
) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

//Get all Academic Semester from Database
export const getALLAcademicFacultyFromDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

//Get a Academic Semester by Id from Database
export const getAAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

//Update a Academic Semester by Id from Database
export const updateAAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
