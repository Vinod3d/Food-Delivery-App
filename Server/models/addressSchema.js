import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    phone_number: { type: String, required: true, trim: true },
    full_address: { type: String, required: true, trim: true },
    is_default: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
