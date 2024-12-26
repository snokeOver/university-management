import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import { loginValidation } from "./auth.validation";
import { loginUser } from "./auth.controller";

const authRoute = express.Router();

authRoute.post("/login", validateRequest(loginValidation), loginUser);

export default authRoute;
