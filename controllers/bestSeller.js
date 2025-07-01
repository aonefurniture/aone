import BestSeller from "../models/BestSeller.js";
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
  const userDir = "./build/images/bestseller/new/";
  const filePath = path.join(userDir, uniqueFileName);

  // Save the resized image to disk
  fs.writeFileSync(filePath, resizedImageBuffer);

  // Set the image URL in the request object for further processing
  req.imageURL = `/images/bestseller/new/${uniqueFileName}`;

  let info = {
    name: req.body.text,
    image: req.imageURL,
  };
  try {
    const savedProduct = await BestSeller.create(info);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await BestSeller.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProductImg = async (req, res) => {
  const product = await BestSeller.findById(req.params.id);
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
  const userDir = "./build/images/bestseller/new/";
  const filePath = path.join(userDir, uniqueFileName);

  // Save the resized image to disk
  fs.writeFileSync(filePath, resizedImageBuffer);

  // Set the image URL in the request object for further processing
  req.imageURL = `/images/bestseller/new/${uniqueFileName}`;

  let info = {
    name: req.body.text,
    image: req.imageURL,
  };

  try {
    const updatedProduct = await BestSeller.findByIdAndUpdate(
      req.params.id,
      {
        $set: info,
      },
      { new: true }
    );

    fs.unlinkSync(`./build${product.image}`, { recursive: true });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await BestSeller.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    fs.unlinkSync(`./build${product.image}`, { recursive: true });
    await BestSeller.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await BestSeller.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const Products = await BestSeller.find().sort({ _id: -1 });
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
};
