import mongoose from "mongoose";

export interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

export interface IError {
  message: string;
}
