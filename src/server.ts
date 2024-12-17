import mongoose from "mongoose";
import { mongoUrl } from ".";
import { AppError } from "./utils/error.class";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: MongooseCache = { conn: null, promise: null };

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;
  if (!mongoUrl)
    throw new AppError(
      500,
      "Missing Variable",
      "MongoDB Url is missing in env file"
    );

  try {
    cached.promise = mongoose
      .connect(mongoUrl)
      .then((mongoseInstace) => mongoseInstace);
  } catch (error) {
    cached.promise = null;
    throw new AppError(
      503,
      "Database unavailable",
      "Failed to connect to MongoDB with error"
    );
    void error;
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connection successfull !");
  return cached.conn;
};
