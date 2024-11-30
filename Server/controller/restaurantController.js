import cloudinary from "../config/cloudinaryConfig.js";
import Restaurant from "../models/restaurantSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

export const addRestaurant = async (req, res, next) => {
  try {
    const { name, rating } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return next(CustomErrorHandler.badRequest("Invalid or missing 'name' field"));
    }

    if (!req.files || !req.files.bannerImage || !req.files.logo) {
      return next(CustomErrorHandler.badRequest("Banner and Logo images are required"));
    }

    if (rating && (isNaN(rating) || rating < 0 || rating > 5)) {
      return next(CustomErrorHandler.badRequest("Invalid rating. Must be between 0 and 5."));
    }

    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];
    const { bannerImage, logo } = req.files;

    if (!allowedMimeTypes.includes(bannerImage.mimetype) || !allowedMimeTypes.includes(logo.mimetype)) {
      return next(CustomErrorHandler.badRequest("Invalid file type. Only JPEG, PNG, and GIF are allowed"));
    }

    const bannerResponse = await cloudinary.uploader.upload(bannerImage.tempFilePath, {
      folder: "restaurants/bannerImages",
    });

    if (!bannerResponse || bannerResponse.error) {
      return next(CustomErrorHandler.badRequest("Error uploading banner image to Cloudinary"));
    }

    const logoResponse = await cloudinary.uploader.upload(logo.tempFilePath, {
      folder: "restaurants/logos",
    });

    if (!logoResponse || logoResponse.error) {
      return next(CustomErrorHandler.badRequest("Error uploading logo to Cloudinary"));
    }

    const newRestaurant = new Restaurant({
      name,
      bannerImage: bannerResponse.secure_url,
      logo: logoResponse.secure_url,
      rating: rating || 0,
    });

    await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant added successfully",
      data: newRestaurant,
    });
  } catch (error) {
    return next(error);
  }
};


export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("categories", "name icon")
      .populate("offers", "title discount");

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};