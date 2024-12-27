//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  deleteSingleAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
} from "./admin.controller";
import { updateadminZodValidation } from "./admin.zod";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const adminRoute = express.Router();

adminRoute.get("/get-all-admins", auth(USER_ROLE.Admin), getAllAdmins);
adminRoute.get("/:id", getSingleAdmin);
adminRoute.delete("/:id", deleteSingleAdmin);
adminRoute.patch(
  "/:id",
  validateRequest(updateadminZodValidation),
  updateSingleAdmin
);

export default adminRoute;
