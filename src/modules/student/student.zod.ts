import { z } from "zod";
import { userValidation } from "../user/user.zod";

//Name validation
const nameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(), // Optional field
  lastName: z.string(),
});

// Guardian schema
const guardianSchema = z.object({
  guardianName: z.string(),
  guardianContactNo: z.string(),
  guardianOccupation: z.string(),
  relation: z.string(),
});

// Main Student schema
const studentSchema = z.object({
  name: nameSchema,
  gender: z.string(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.string(),
  presentAddress: z.string(),
  permanetAddress: z.string(),
  guardian: guardianSchema,
  profileImage: z.string().url(),
  academicSemister: z.string(),
  academicDepartment: z.string(),
});

export const studentZodValidation = z.object({
  credentials: userValidation,
  student: studentSchema,
});

//update Name validation
const updateNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(), // Optional field
  lastName: z.string().optional(),
});

// Update Guardian schema
const updateGuardianSchema = z.object({
  guardianName: z.string().optional(),
  guardianContactNo: z.string().optional(),
  guardianOccupation: z.string().optional(),
  relation: z.string().optional(),
});

// Main Student schema
export const updateStudentZodValidation = z.object({
  name: updateNameSchema.optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.string().optional(),
  presentAddress: z.string().optional(),
  permanetAddress: z.string().optional(),
  guardian: updateGuardianSchema.optional(),
  profileImage: z.string().url().optional(),
  academicSemister: z.string().optional(),
  academicDepartment: z.string().optional(),
});
