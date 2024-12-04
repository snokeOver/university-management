//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";
import { createStudent } from "./user.controller";

const userRoute = express.Router();

userRoute.post("/create-student", createStudent);

export default userRoute;
