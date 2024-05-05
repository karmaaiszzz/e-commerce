import mongoose from "mongoose";
const dbUserName = "shrutee";
const dbPassword = "1shru122";
const databaseName = "eCommerce";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@school.o7ndiui.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=School`
    );
    console.log("DB connection established.");
  } catch (error) {
    console.log("DB connection failed.");
    console.log(error.message);
  }
};
export default connectDB;
