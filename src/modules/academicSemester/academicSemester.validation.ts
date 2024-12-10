import { z } from "zod";
import {
  academicSemCode,
  academicSemName,
  months,
} from "./academicSemester.constants";

export const academicSemesterValidation = z.object({
  name: z.enum([...academicSemName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...academicSemCode] as [string, ...string[]]),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
});
