import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    pincode: { type: Number, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    address3: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model('Order', ProductSchema);
