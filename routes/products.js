import express from "express";
import {
  createProduct,
  updateFileProduct,
  deleteProduct,
  getCategoryProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  getSubCategoryProduct,
} from "../controllers/product.js";
import data from "../data.js";
import Product from "../models/Product.js";
import NewLaunch from "../models/NewLaunch.js";
import BestSeller from "../models/BestSeller.js";
import multer from "multer";
import { isAuth } from "../utils/isAuth.js";
import { uploadImage } from "../utils/uploadImage.js";

const router = express.Router();

//create product
router.post("/", isAuth, uploadImage.single("image"), createProduct);
//update file  product
router.put("/file/:id", isAuth, uploadImage.single("image"), updateFileProduct);
//update product
router.put("/:id", isAuth, updateProduct);
//delete product
router.delete("/:id", isAuth, deleteProduct);
//get product
router.get("/:id", getProduct);
//get all product
router.get("/", getAllProduct);
//getall category product
router.get("/category/:slug", getCategoryProduct);
//getall subCategory product
router.get("/subCategory/:slug", getSubCategoryProduct);

//seed
// router.get("/seed", async (req, res) => {
//   await Product.remove({});
//   await NewLaunch.remove({});
//   await BestSeller.remove({});
//   const createdProducts = await Product.insertMany(data.products);
//   const createdNewLaunch = await NewLaunch.insertMany(data.newlaunch);
//   const createdBestSeller = await BestSeller.insertMany(data.bestseller);

//   res.send({ createdProducts, createdNewLaunch, createdBestSeller });
// });

export default router;
