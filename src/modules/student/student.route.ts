//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";
import { getAllStudents, getAStudent } from "./student.controller";

const studentRoute = express.Router();

studentRoute.get("/get-all-students", getAllStudents);
studentRoute.get("/:id", getAStudent);

export default studentRoute;
