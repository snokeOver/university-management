import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

//Create a Academic Department to Database
export const createAcademicDepartmentIntoDB = async (
  payload: IAcademicDepartment
) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

//Get all Academic Department from Database
export const getALLAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

//Get a Academic Department by Id from Database
export const getAAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};

//Update a Academic Department by Id from Database
export const updateAAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
