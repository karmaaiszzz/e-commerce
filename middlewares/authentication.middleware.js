import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

//! User role
export const isUser = async (req, res, next) => {
  //extract toke from req.headers
  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  let payload;

  try {
    payload = jwt.verify(token, "mysecretkey");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user with given email
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUser = user;
  next();
};

//! Seller
export const isSeller = async (req, res, next) => {
  //extract toke from req.headers

  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  let payload;

  try {
    payload = jwt.verify(token, "mysecretkey");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user with given email
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  if (user.role !== "Seller") {
    return res.status(401).send({ message: "Unauthorized." });
  }
  req.loggedInUser = user;
  next();
};
