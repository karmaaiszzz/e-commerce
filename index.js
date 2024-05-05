import express from "express";
import userRoutes from "./user/user.routes.js";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routes.js";
const app = express();
//to make app understand json
app.use(express.json());

//connect database
await connectDB();

//register routes
app.use(userRoutes);
app.use(productRoutes);
//port
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
