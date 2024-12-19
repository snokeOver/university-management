import mongoose from "mongoose";

export interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

export interface IError {
  message: string;
}

export type TGender = "Male" | "Female" | "Other";

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
