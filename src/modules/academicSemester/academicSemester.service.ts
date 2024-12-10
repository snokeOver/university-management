import { AcademicSemesterMoel } from "./academicSemester.model";
import { IAcademicSemester } from "./academicSemester.type";

export const createAcademicSemesterToDB = async (
  aSemster: IAcademicSemester
) => {
  const result = await AcademicSemesterMoel.create(aSemster);
  return result;
};
