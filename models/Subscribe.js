import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Subscribe", SubscribeSchema);
