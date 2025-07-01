import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model("Product", ProductSchema);
