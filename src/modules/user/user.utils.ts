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

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (aSemester: IAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await getLastStudentId();
  const lastStudentSemCode = lastStudentId?.substring(4, 6);
  const lastStudentSemYear = lastStudentId?.substring(0, 4);

  if (
    lastStudentId &&
    lastStudentSemCode === aSemester.code &&
    lastStudentSemYear === aSemester.year
  ) {
    currentId = lastStudentId.substring(6);
  }

  const incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");

  const finalId = `${aSemester.year}${aSemester.code}${incrementedId}`;
  return finalId;
};

//For admin----------------
export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: "Admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};

//For faculty -----------------
export const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: "Faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};
