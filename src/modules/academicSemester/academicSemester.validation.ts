import { z } from "zod";
import {
  academicSemCode,
  academicSemName,
  months,
} from "./academicSemester.constants";

export const academicSemesterValidationCreate = z.object({
  name: z.enum([...academicSemName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...academicSemCode] as [string, ...string[]]),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
});

export const academicSemesterValidationUpdate = z.object({
  name: z.enum([...academicSemName] as [string, ...string[]]).optional(),
  year: z.string().optional(),
  code: z.enum([...academicSemCode] as [string, ...string[]]).optional(),
  startMonth: z.enum([...months] as [string, ...string[]]).optional(),
  endMonth: z.enum([...months] as [string, ...string[]]).optional(),
});
