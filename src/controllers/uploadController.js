import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadProductImageLocal = async (req, res) => {
  const maxSize = 1024 * 20; // 20kb

  const acceptedFiles = ["image/jpeg", "image/png"];

  const productImage = req.files.image;

  if (productImage.size > maxSize)
    return res.status(400).json({ message: "File too large" });

  if (!acceptedFiles.includes(productImage.mimetype))
    return res.status(400).json({ message: "Invalid Image Type" });

  const imagePath = join(__dirname, "../public/uploads/", productImage.name);

  await productImage.mv(imagePath);

  res.status(201).json({
    message: "Image uploaded successfully",
    image: { src: `/uploads/${productImage.name}` },
  });
};

// ! you can use streams here
export const uploadProductImage = async (req, res) => {
  const maxSize = 1024 * 20; // 20kb

  const acceptedFiles = ["image/jpeg", "image/png"];

  const productImage = req.files.image;

  if (productImage.size > maxSize)
    return res.status(400).json({ message: "File too large" });

  if (!acceptedFiles.includes(productImage.mimetype))
    return res.status(400).json({ message: "Invalid Image Type" });

  const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
    use_filename: true,
    folder: "tutorial/products",
  });

  fs.unlinkSync(productImage.tempFilePath);

  res.status(201).json({
    message: "Image uploaded successfully",
    image: { src: result.secure_url },
  });
};
