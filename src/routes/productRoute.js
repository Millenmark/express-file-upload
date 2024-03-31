import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { uploadProductImage } from "../controllers/uploadController.js";

const router = Router();

router.route("/products").get(getAllProducts).post(createProduct);
router.route("/uploads").post(uploadProductImage);

export default router;
