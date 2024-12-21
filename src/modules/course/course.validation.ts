import { z } from "zod";

export const preRequisitValidation = z.object({
  course: z.string({
    invalid_type_error: "Course must be a string",
  }),
  isDeleted: z.boolean().optional(),
});

export const courseValidation = z.object({
  title: z.string({
    invalid_type_error: "Course Title must be a string",
  }),
  prefix: z.string({
    invalid_type_error: "Course prefix must be a string",
  }),
  code: z.number({
    invalid_type_error: "Course code must be number",
  }),
  credits: z.number({
    invalid_type_error: "Course code must be number",
  }),
  preRequisitCourses: z.array(preRequisitValidation).optional(),
  isDeleted: z.boolean().optional(),
});

export const updateCourseValidation = courseValidation.partial();

export const assignFacultiesValidation = z.object({
  faculties: z.array(z.string()),
});
