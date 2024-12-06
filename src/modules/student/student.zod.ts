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
  dateOfBirth: z.string(), // Use appropriate format validation if needed
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.string(),
  presentAddress: z.string(),
  permanetAddress: z.string(),
  guardian: guardianSchema,
  profileImage: z.string().url(),
});

export const studentZodValidation = z.object({
  credentials: userValidation,
  student: studentSchema,
});
