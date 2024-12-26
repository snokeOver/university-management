import { z } from "zod";

export const loginValidation = z.object({
  id: z.string({
    required_error: "User Id required",
  }),
  password: z.string({
    required_error: "User Password is required",
  }),
});
