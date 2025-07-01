import Feed from "../models/Feed.js";

export const createFeed = async (req, res) => {
  try {
    const savedProduct = await Feed.create(req.body);
    res.status(200).json({
      success: true,
      message: "Feedback added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteFeed = async (req, res) => {
  try {
    await Feed.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllFeed = async (req, res, next) => {
  try {
    const Products = await Feed.find();
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
