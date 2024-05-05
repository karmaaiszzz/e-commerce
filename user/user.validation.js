import * as Yup from "yup";
import { GenderOptions, UserRoles } from "../constants/general.constants.js";
export let userSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is requied.")
    .trim()
    .max(55, "First Name cannot exceed 55 characters"),
  lastName: Yup.string()
    .required("Last name is requied.")
    .trim()
    .max(55, "Last Name cannot exceed 55 characters"),
  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required.")
    .trim()
    .lowercase()
    .max(55, "Email cannot exceed 55 characters"),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must have atleast 8 characters.")
    .max(20, "Password cannot exceed 20 characters"),
  gender: Yup.string().oneOf(GenderOptions).trim(),
  dob: Yup.date(),
  role: Yup.string().oneOf(UserRoles).required("Role is required.").trim(),
});

export let loginUserSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required."),
});
