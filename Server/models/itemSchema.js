import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", default: null }
}, { timestamps: true });

// Indexes for faster queries
itemSchema.index({ category: 1 });
itemSchema.index({ restaurant: 1 });

export default mongoose.model("Item", itemSchema);
