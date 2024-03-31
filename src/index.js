import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

dotenv.config();
const app = express();
app.use(express.json());

/** START APP */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server already running on port: ${port}`));
