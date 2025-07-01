import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("BestSeller", ProductSchema);
