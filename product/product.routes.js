import express from "express";
import { validateReqBody } from "../middlewares/validation.middleware.js";
import { productSchema } from "./product.validation.js";
import { isSeller, isUser } from "../middlewares/authentication.middleware.js";
import { createProduct, getProduct } from "./product.service.js";

const router = express.Router();

//add new product
router.post(
  "/product/add",
  isSeller,
  validateReqBody(productSchema),
  createProduct
);

//view product detail(can be viewed by all users)
router.get("/product/details/:id", isUser, getProduct);

//delete product
router.delete("/product/delete/:id", isUser, async (req, res) => {
  return res.status(200).send({ message: "Product deleted successfully." });
});

export default router;
