import Product from "../models/Product.js";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const createProduct = async (req, res) => {
  // Convert and resize the uploaded image to WebP format
  const resizedImageBuffer = await sharp(req.file.buffer)
    .resize({ width: 300 })
    .webp({ quality: 60 })
    .toBuffer();

  // Generate a unique file name for the new image
  const uniqueFileName = `${crypto.randomBytes(16).toString("hex")}.webp`;

  // Define the path for saving the image locally
  const userDir = "./build/images/categories/addonfiles/";
  const filePath = path.join(userDir, uniqueFileName);

  // Save the resized image to disk
  fs.writeFileSync(filePath, resizedImageBuffer);

  // Set the image URL in the request object for further processing
  req.imageURL = `/images/categories/addonfiles/${uniqueFileName}`;

  let info = {
    image: req.imageURL,
    category: req.body.category,
    subcategory: req.body.subCategory,
    name: req.body.name,
  };
  console.log(info);
  try {
    const savedProduct = await Product.create(info);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateFileProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json("Product not found");
  }
  // Convert and resize the uploaded image to WebP format
  const resizedImageBuffer = await sharp(req.file.buffer)
    .resize({ width: 300 })
    .webp({ quality: 60 })
    .toBuffer();
  // Generate a unique file name for the new image
  const uniqueFileName = `${crypto.randomBytes(16).toString("hex")}.webp`;

  // Define the path for saving the image locally
  const userDir = "./build/images/categories/addonfiles/";
  const filePath = path.join(userDir, uniqueFileName);

  // Save the resized image to disk
  fs.writeFileSync(filePath, resizedImageBuffer);

  // Set the image URL in the request object for further processing
  req.imageURL = `/images/categories/addonfiles/${uniqueFileName}`;

  let info = {
    image: req.imageURL,
    category: req.body.category,
    subcategory: req.body.subcategory,
    name: req.body.name,
  };

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: info,
      },
      { new: true }
    );

    fs.unlinkSync(`./build${product.image}`, { recursive: true });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    fs.unlinkSync(`./build${product.image}`, { recursive: true });
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find().sort({ _id: 1 });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCategoryProduct = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const Products = await Product.find({ category: `${req.params.slug}` })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSubCategoryProduct = async (req, res, next) => {
  try {
    const Products = await Product.find({
      subcategory: `${req.params.slug}`,
    }).sort({ _id: -1 });
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
