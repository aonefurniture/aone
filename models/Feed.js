import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema(
  {
    feedback: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Feed", FeedSchema);
