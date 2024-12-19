import { z } from "zod";
import { userValidation } from "../user/user.zod";

//Name validation
const nameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(), // Optional field
  lastName: z.string(),
});

// Main faculty schema
const facultySchema = z.object({
  name: nameSchema,
  designation: z.string(),
  gender: z.string(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.string(),
  presentAddress: z.string(),
  permanetAddress: z.string(),
  academicDepartment: z.string(),
  profileImage: z.string().url(),
});

export const facultyZodValidation = z.object({
  credentials: userValidation,
  faculty: facultySchema,
});

//update Name validation
const updateNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(), // Optional field
  lastName: z.string().optional(),
});

// Main faculty schema
export const updatefacultyZodValidation = z.object({
  name: updateNameSchema.optional(),
  designation: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.string().optional(),
  presentAddress: z.string().optional(),
  permanetAddress: z.string().optional(),
  academicDepartment: z.string().optional(),
  profileImage: z.string().url().optional(),
});
