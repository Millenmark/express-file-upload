import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price });
  res.status(201).json({ message: "Product Created Successfully" });
};

export const getAllProducts = async (req, res) => {
  res.send("list of products");
};
