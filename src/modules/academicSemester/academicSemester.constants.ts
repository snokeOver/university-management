import {
  IAcSemNameCodeMapper,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemester.type";

export const months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const academicSemName: TAcademicSemesterName[] = [
  "Autum",
  "Summar",
  "Fall",
];

export const academicSemCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const acSemNameCodeMapper: IAcSemNameCodeMapper = {
  Autum: "01",
  Summar: "02",
  Fall: "03",
};
