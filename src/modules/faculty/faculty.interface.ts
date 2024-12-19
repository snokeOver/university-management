import { Model, Types } from "mongoose";
import {
  IName,
  TBloodGroup,
  TGender,
} from "../../types-interface/typesInterface";

export interface IFaculty {
  userId: Types.ObjectId;
  facultyId: string;
  designation: string;
  name: IName;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanetAddress: string;
  academicDepartment: Types.ObjectId;
  profileImage?: string;
}

//for static method

export interface newFacultyModel extends Model<IFaculty> {
  isFacultyExist(id: string): Promise<IFaculty | null>;
}
