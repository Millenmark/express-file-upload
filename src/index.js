import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import connectToDB from "./config/connectToDB.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();
connectToDB();
const app = express();
app.use(express.json());

app.use("/api", productRoute);

/** POST MIDDLEWARE */
app.use(notFound);
app.use(errorHandler);

/** START APP */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server already running on port: ${port}`));
