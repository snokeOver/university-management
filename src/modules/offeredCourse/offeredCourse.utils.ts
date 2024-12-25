import { ISchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  assignedSchedules: ISchedule[],
  newSchedule: ISchedule
) => {
  const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
  const newEndtTime = new Date(`1970-01-01T${newSchedule.endTime}`);

  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndtTime = new Date(`1970-01-01T${schedule.endTime}`);
    if (newStartTime < existingEndtTime && newEndtTime > existingStartTime)
      return true;
  }

  return false;
};
