import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    bannerImage: { 
        type: String,
        required: true
    },
    logo: { 
        type: String, 
        required: true
    },
    rating: { 
        type: Number, 
        default: 0 
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],

}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
