import express from "express";

import {
  validateRequest,
  validateTokenRequest,
} from "../../middlewares/validateData";
import {
  changePassValidation,
  loginValidation,
  refreshTokenValidation,
} from "./auth.validation";
import {
  changePassword,
  getTokenByRefreshToken,
  loginUser,
} from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const authRoute = express.Router();

authRoute.post("/login", validateRequest(loginValidation), loginUser);
authRoute.post(
  "/change-password",
  auth(USER_ROLE.Admin, USER_ROLE.Faculty, USER_ROLE.Student),
  validateRequest(changePassValidation),
  changePassword
);

authRoute.post(
  "/refresh-token",
  validateTokenRequest(refreshTokenValidation),
  getTokenByRefreshToken
);

export default authRoute;
