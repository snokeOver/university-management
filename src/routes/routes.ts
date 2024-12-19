import { Router } from "express";
import userRoute from "../modules/user/user.route";
import studentRoute from "../modules/student/student.route";
import academicSemesterRoute from "../modules/academicSemester/academicSemester.route";
import academicFacultyRoute from "../modules/academicFaculty/academicFaculty.route";
import academicDepartmentRoute from "../modules/academicDepartment/academicDepartment.route";
import adminRoute from "../modules/admin/admin.route";

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
    path: "/admins",
    route: adminRoute,
  },
  {
    path: "/academic-semesters",
    route: academicSemesterRoute,
  },
  {
    path: "/academic-faculties",
    route: academicFacultyRoute,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
