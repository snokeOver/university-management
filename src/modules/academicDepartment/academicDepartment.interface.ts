import { Types } from "mongoose";

export interface IAcademicDepartment {
  name: string;
  academicFacultyId: Types.ObjectId;
}
