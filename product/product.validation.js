import * as Yup from "yup";
import { productCategories } from "../constants/general.constants.js";

export let productSchema = Yup.object({
  name: Yup.string()
    .max(30, "Name cannot exceed 30 characters.")
    .required("Name is required.")
    .trim(),
  brand: Yup.string()
    .max(30, "Brand cannot exceed 30 characters.")
    .required("Brand is required.")
    .trim(),
  price: Yup.number().min(0).required("Price is required."),
  quantity: Yup.number().min(1).required("Quantity is required."),
  category: Yup.string().oneOf(productCategories),
  image: Yup.string().nullable(),
  description: Yup.string()
    .required("Description is required.")
    .trim()
    .max(1000, "Description cannot exceed 1000 characters."),
});
