import express from "express";
import { validateReqBody } from "../middlewares/validation.middleware.js";
import { createUser, loginUser } from "./user.service.js";
import { loginUserSchema, userSchema } from "./user.validation.js";

const router = express.Router();

//register user
router.post("/user/register", validateReqBody(userSchema), createUser);

//login user
router.post("/user/login", validateReqBody(loginUserSchema), loginUser);
export default router;
