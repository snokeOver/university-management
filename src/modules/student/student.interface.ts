import { Model, Types } from "mongoose";

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IGuardian {
  guardianName: string;
  guardianOccupation: string;
  guardianContactNo: string;
  relation: string;
}

export interface IStudent {
  userId: Types.ObjectId;
  studentId: string;
  name: IName;
  gender: "Male" | "Female" | "Others";
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanetAddress: string;
  guardian: IGuardian;
  profileImage?: string;
  academicSemister: Types.ObjectId;
  academicDepartment: Types.ObjectId;
}

//for instace method
/*
export interface IStudentMethod {
  isStudentExist(id: string): Promise<IStudent | null>;
}

// Create a new Model type that knows about IStudentMethod...
export type newStudentModel = Model<
  IStudent,
  Record<string, never>,
  IStudentMethod
>;

*/

//for static method

export interface newStudentModel extends Model<IStudent> {
  isStudentExist(id: string): Promise<IStudent | null>;
}
