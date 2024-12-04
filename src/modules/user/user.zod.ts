import { z } from "zod";

export const userValidation = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password can't be more than 20 character" })
    .optional(),
  email: z.string().email({
    message: "Email must be a string",
  }),
});
