import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  updateName,
  updateProductImg,
} from "../controllers/newLaunch.js";
import multer from "multer";
import { isAuth } from "../utils/isAuth.js";
import { uploadImage } from "../utils/uploadImage.js";

const router = express.Router();

//create product
router.post("/", isAuth, uploadImage.single("image"), createProduct);
//update product
router.put("/:id", isAuth, updateProduct);
//update updateProductImg
router.put("/img/:id", isAuth, uploadImage.single("image"), updateProductImg);
//update productname only
router.put("/name/:id", isAuth, updateName);
//delete product
router.delete("/:id", isAuth, deleteProduct);
//get product
router.get("/:id", getProduct);
//getall product
router.get("/", getAllProduct);

export default router;
