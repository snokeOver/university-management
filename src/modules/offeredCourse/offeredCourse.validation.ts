import { z } from "zod";
import { Days } from "./offeredCourse.constants";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

export const offeredCourseValidation = z
  .object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    section: z.number(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema, // HH: MM   00-23: 00-59
    endTime: timeStringSchema,
  })
  .refine(
    (data) => {
      const start = new Date(`1970-01-01T${data.startTime}:00`);
      const end = new Date(`1970-01-01T${data.endTime}:00`);
      return end > start;
    },
    {
      message: "Start time must be earlier than end time",
      path: ["endTime"], // Optional: Specifies which field the error is associated with
    }
  );

export const updateofferedCourseValidation = z.object({
  faculty: z.string(),
  maxCapacity: z.number(),
  days: z.array(z.enum([...Days] as [string, ...string[]])),
  startTime: timeStringSchema, // HH: MM   00-23: 00-59
  endTime: timeStringSchema,
});
