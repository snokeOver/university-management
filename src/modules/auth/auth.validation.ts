import { z } from "zod";

export const loginValidation = z.object({
  id: z.string({
    required_error: "User Id required",
  }),
  password: z.string({
    required_error: "User Password is required",
  }),
});

export const changePassValidation = z.object({
  oldPassword: z.string({
    required_error: "Old Password is required",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
  }),
});
