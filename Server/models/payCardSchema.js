import mongoose from "mongoose";

const payCardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 16,
      maxlength: 16,
      validate: {
        validator: (value) => /^[0-9]{16}$/.test(value),
        message: "Card number must be a valid 16-digit number",
      },
    },
    expiration: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value),
        message: "Expiration date must be in the format MM/YY",
      },
    },
    cvc: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 4,
      validate: {
        validator: (value) => /^[0-9]{3,4}$/.test(value),
        message: "CVC must be a valid 3 or 4-digit number",
      },
    },
    nameOnCard: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PayCard", payCardSchema);
