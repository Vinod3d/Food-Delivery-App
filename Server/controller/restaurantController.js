import cloudinary from "../config/cloudinaryConfig.js";
import Restaurant from "../models/restaurantSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

export const addRestaurant = async (req, res, next) => {
  try {
    const { name, rating } = req.body;

    // Validate input
    if (!name || typeof name !== "string" || name.trim() === "") {
      return next(CustomErrorHandler.badRequest("Invalid or missing 'name' field"));
    }

    if (!req.files || !req.files.bannerImage || !req.files.logo) {
      return next(CustomErrorHandler.badRequest("Banner and Logo images are required"));
    }

    // Validate rating (if provided)
    if (rating && (isNaN(rating) || rating < 0 || rating > 5)) {
      return next(CustomErrorHandler.badRequest("Invalid rating. Must be between 0 and 5."));
    }

    // Validate image file types
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];
    const { bannerImage, logo } = req.files;

    if (!allowedMimeTypes.includes(bannerImage.mimetype) || !allowedMimeTypes.includes(logo.mimetype)) {
      return next(CustomErrorHandler.badRequest("Invalid file type. Only JPEG, PNG, and GIF are allowed"));
    }

    // Upload bannerImage to Cloudinary
    const bannerResponse = await cloudinary.uploader.upload(bannerImage.tempFilePath, {
      folder: "restaurants/bannerImages",
    });

    if (!bannerResponse || bannerResponse.error) {
      return next(CustomErrorHandler.badRequest("Error uploading banner image to Cloudinary"));
    }

    // Upload logo to Cloudinary
    const logoResponse = await cloudinary.uploader.upload(logo.tempFilePath, {
      folder: "restaurants/logos",
    });

    if (!logoResponse || logoResponse.error) {
      return next(CustomErrorHandler.badRequest("Error uploading logo to Cloudinary"));
    }

    // Save restaurant data to database
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
