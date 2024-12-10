import { Router } from "express";
import userRoute from "../modules/user/user.route";
import studentRoute from "../modules/student/student.route";
import academicSemesterRoute from "../modules/academicSemester/academicSemester.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/students",
    route: studentRoute,
  },
  {
    path: "/academic-semesters",
    route: academicSemesterRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
