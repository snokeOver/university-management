import { z } from "zod";

export const createAcademicDepartmentValidation = z.object({
  name: z.string({
    invalid_type_error: "Academic Department name must be a string",
    required_error: "Academic Department must be required",
  }),
  academicFacultyId: z.string({
    invalid_type_error: "Academic Faculty Id name must be a string",
    required_error: "Academic Faculty Id must be required",
  }),
});

export const updateAcademicDepartmentValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Academic Department name must be a string",
    })
    .optional(),

  academicFacultyId: z
    .string({
      invalid_type_error: "Academic Faculty Id name must be a string",
    })
    .optional(),
});
