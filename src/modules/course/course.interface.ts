import { Types } from "mongoose";

export interface IPrerequisitCourses {
  course: Types.ObjectId;
  isDeleted?: boolean;
}

export interface ICourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisitCourses: IPrerequisitCourses[];
  isDeleted?: boolean;
}
