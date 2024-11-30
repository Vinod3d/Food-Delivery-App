import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  shopname: { type: String, required: true },
  description: { type: String },
  discount: { type: Number, required: true },
  image: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

export default mongoose.model("Offer", offerSchema);