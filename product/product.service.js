import Product from "./product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  //extract new product from req.body
  const newProduct = req.body;
  //console.log(req.loggedInUser);
  //we need logged in user ID for product owner ID
  newProduct.ownerId = req.loggedInUser._id;
  //create product
  await Product.create(newProduct);
  return res.status(200).send({ message: "Product added successfully." });
};

export const getProduct = async (req, res) => {
  //extract id from req.params
  const productId = req.params.id;
  //check for mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);
  //if !validmongoid, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }
  //find product
  const requiredProduct = await Product.findOne({ _id: productId });
  //if !product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }
  //hie owner id
  requiredProduct.ownerId = undefined;
  //send product details as response
  return res.status(200).send({ message: "Success", product: requiredProduct });
};
