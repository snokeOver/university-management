import { z } from "zod";

// Name schema
const studentNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(20, "First name can't be greater than 20 characters")
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1) ===
        value,
      {
        message: "First name must be capitalized",
      }
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Last name must contain only alphabets",
    }),
});

// Guardian schema
const studentGuardianZodSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
});

// Main Student schema
export const studentZodSchema = z.object({
  id: z.string().min(1, "Student ID is required"),
  name: studentNameZodSchema,
  gender: z.enum(["Male", "Female", "Others"], {
    errorMap: () => ({ message: "Gender must be Male, Female, or Others" }),
  }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Invalid blood group" }),
  }),
  presentAddress: z.string().min(1, "Present address is required"),
  permanetAddress: z.string().min(1, "Permanent address is required"),
  guardian: studentGuardianZodSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["Active", "blocked"]).default("Active"),
});
