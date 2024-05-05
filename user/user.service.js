import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";

export const createUser = async (req, res) => {
  const newUser = req.body;
  //check if user with provided email already exists
  const user = await User.findOne({ email: newUser.email });
  //if user, throw error
  if (user) {
    return res
      .status(409)
      .send({ message: "User with this email already exists." });
  }
  //create user
  //hash password
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;

  await User.create(newUser);
  //send response
  return res.status(201).send({ message: "User is registered successfully" });
};

export const loginUser = async (req, res) => {
  const loginCredentials = req.body;
  //check if user with provided email exists
  const user = await User.findOne({ email: loginCredentials.email });
  //if (!user), throw error
  if (!user) {
    return res.status(404).send({ message: "Invalid credentials." });
  }
  //compare password with hashed password
  const isPasswordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );
  //if password not match, throw error
  if (!isPasswordMatch) {
    return res.status(404).send({ message: "Invalid credentials." });
  }
  //generate token and send response
  const token = jwt.sign({ email: user.email }, "mysecretkey", {
    expiresIn: "24h",
  });
  //hide hashed password
  user.password = undefined;
  return res
    .status(200)
    .send({ message: "Login successful.", userData: user, token: token });
};
