import { Types } from "mongoose";

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endtDate: Date;
  minCredit: number;
  maxCredit: number;
}
