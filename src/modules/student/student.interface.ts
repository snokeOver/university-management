import { Model, Types } from "mongoose";
import {
  IName,
  TBloodGroup,
  TGender,
} from "../../types-interface/typesInterface";

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
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
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
