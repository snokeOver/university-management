import { z } from "zod";
import { userValidation } from "../user/user.zod";

//Name validation
const nameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(), // Optional field
  lastName: z.string(),
});

// Main admin schema
const adminSchema = z.object({
  name: nameSchema,
  designation: z.string(),
  gender: z.string(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.string(),
  presentAddress: z.string(),
  permanetAddress: z.string(),
  profileImage: z.string().url(),
});

export const adminZodValidation = z.object({
  credentials: userValidation,
  admin: adminSchema,
});

//update Name validation
const updateNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(), // Optional field
  lastName: z.string().optional(),
});

// Main admin schema
export const updateadminZodValidation = z.object({
  name: updateNameSchema.optional(),
  designation: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.string().optional(),
  presentAddress: z.string().optional(),
  permanetAddress: z.string().optional(),
  profileImage: z.string().url().optional(),
});
