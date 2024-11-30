import cloudinary from "../config/cloudinaryConfig.js";
import Offer from "../models/offerSchema.js";
import Restaurant from "../models/restaurantSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

export const createOffer = async (req, res, next) => {
  try {
    const { shopname, description, discount, restaurant } = req.body;

    if (!req.files || !req.files.image) {
      return next(CustomErrorHandler.badRequest("No image uploaded"));
    }

    const imageFile = req.files.image;
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];

    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return next(CustomErrorHandler.badRequest("Invalid image type. Only JPEG, PNG, and GIF are allowed"));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: "food-delivery/offers"
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(
        CustomErrorHandler.badRequest(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary Error"
        )
      );
    }

    const newOffer = new Offer({
      shopname,
      description,
      discount,
      image: cloudinaryResponse.secure_url,
      restaurant
    });

    await newOffer.save();

    await Restaurant.findByIdAndUpdate(
      restaurant,
      { $push: { offers: newOffer._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Offer created successfully",
      data: newOffer
    });
  } catch (error) {
    return next(error);
  }
};

// Get All Offers
export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find()
      .populate("restaurant", "name logo")
      .select("shopname description discount image");

    if (!offers || offers.length === 0) {
      return next(CustomErrorHandler.notFound("No offers found"));
    }

    res.status(200).json({
      message: "Offers fetched successfully",
      data: offers
    });
  } catch (error) {
    return next(error);
  }
};


// Get offer by restaurant

export const getOffersByRestaurantId = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const offers = await Offer.find({ restaurant: restaurantId })
      .populate("restaurant", "name logo")
      .select("title description discount image");

    if (!offers || offers.length === 0) {
      return next(CustomErrorHandler.notFound("No offers found for this restaurant"));
    }

    res.status(200).json({
      message: "Offers fetched successfully",
      data: offers
    });
  } catch (error) {
    return next(error);
  }
};


