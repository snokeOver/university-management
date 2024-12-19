import { Model, Types } from "mongoose";
import {
  IName,
  TBloodGroup,
  TGender,
} from "../../types-interface/typesInterface";

export interface IAdmin {
  userId: Types.ObjectId;
  adminId: string;
  designation: string;
  name: IName;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanetAddress: string;
  profileImage?: string;
}

//for static method

export interface newAdminModel extends Model<IAdmin> {
  isAdminExist(id: string): Promise<IAdmin | null>;
}
