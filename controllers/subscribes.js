import Subscribe from "../models/Subscribe.js";

export const createSubscribe = async (req, res) => {
  const newProduct = Subscribe(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateSubscribe = async (req, res) => {
  try {
    const updatedProduct = await Subscribe.findByIdAndUpdate(
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

export const deleteSubscribe = async (req, res) => {
  try {
    await Subscribe.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSubscribe = async (req, res) => {
  try {
    const Product = await Subscribe.findById(req.params.id);
    res.status(200).json(Product);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllSubscribe = async (req, res, next) => {
  try {
    const Products = await Subscribe.find();
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
