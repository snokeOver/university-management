import mongoose from "mongoose";
import { mongoUrl } from ".";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: MongooseCache = { conn: null, promise: null };

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;
  if (!mongoUrl) throw new Error("MongoDB Url is missing in env file");

  try {
    cached.promise = mongoose
      .connect(mongoUrl)
      .then((mongoseInstace) => mongoseInstace);
  } catch (error) {
    cached.promise = null;
    throw new Error(`Failed to connect to MongoDB with error:  ${error}`);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connection successfull !");
  return cached.conn;
};
