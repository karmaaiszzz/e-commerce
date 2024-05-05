import mongoose from "mongoose";
import { GenderOptions, UserRoles } from "../constants/general.constants.js";

//set rule/schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 55,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 55,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxLength: 55,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      //length not needed bc while storing in the database we convert it to hash which is assigned by the developer so max length need not be specified to the user
    },
    gender: {
      type: String,
      required: false,
      enum: GenderOptions,
      default: null,
    },
    dob: {
      type: Date,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: UserRoles,
    },
  },
  {
    timestamps: true,
  }
);

//create table
export const User = mongoose.model("User", userSchema);
