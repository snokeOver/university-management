import { z } from "zod";

export const academicFacultyValidation = z.object({
  name: z.string({
    invalid_type_error: "Academic Faculty name must be a string",
  }),
});
