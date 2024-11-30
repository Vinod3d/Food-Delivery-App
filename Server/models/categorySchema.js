import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    icon: {
        type: String,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        default: null,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", default: [] }],
  },
  { timestamps: true }
);

categorySchema.index({ restaurant: 1 });

export default mongoose.model("Category", categorySchema);
