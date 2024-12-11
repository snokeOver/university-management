import { acSemNameCodeMapper } from "./academicSemester.constants";
import { AcademicSemesterMoel } from "./academicSemester.model";
import { IAcademicSemester } from "./academicSemester.type";

export const createAcademicSemesterToDB = async (
  aSemster: IAcademicSemester
) => {
  if (acSemNameCodeMapper[aSemster.name] !== aSemster.code)
    throw new Error("Invalid Semester Name or Code");

  const result = await AcademicSemesterMoel.create(aSemster);
  return result;
};

export const getALLAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterMoel.find();
  return result;
};

export const getAAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterMoel.findById(id);
  return result;
};

export const updateAAcademicSemesterToDB = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    acSemNameCodeMapper[payload.name] !== payload.code
  )
    throw new Error("Invalid Semester Name or Code");

  const result = await AcademicSemesterMoel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
