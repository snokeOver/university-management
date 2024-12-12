import { IAcademicSemester } from "../academicSemester/academicSemester.type";
import { UserModel } from "./user.model";

const getLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: "Student",
    },
    {
      id: 1,
      _id: 0,
    }
  ).sort({
    createdAt: -1,
  });

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (aSemester: IAcademicSemester) => {
  const currentRoll = (await getLastStudentId()) || (0).toString();

  const incrementedRoll = (Number(currentRoll) + 1).toString().padStart(4, "0");

  const finalId = `${aSemester.year}${aSemester.code}${incrementedRoll}`;
  return finalId;
};
