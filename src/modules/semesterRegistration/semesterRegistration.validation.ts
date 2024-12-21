import { z } from "zod";
import { semisterStatus } from "./semesterRegistration.constants";

export const semisterRegistrationValidation = z.object({
  academicSemester: z.string(),
  status: z.enum([...semisterStatus] as [string, ...string[]]),
  startDate: z.string().datetime(),
  endtDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
});

export const updateSemisterRegistrationValidation =
  semisterRegistrationValidation.partial();
