import Category from "../models/categorySchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import cloudinary from "../config/cloudinaryConfig.js"; // Import Cloudinary config

export const createCategory = async (req, res, next) => {

  try {
    const { name, restaurant } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return next(CustomErrorHandler.badRequest("Invalid or missing 'name' field"));
    }

    if (!restaurant) {
      return next(CustomErrorHandler.badRequest("Restaurant ID is required"));
    }

    if (!req.files || !req.files.icon) {
      return next(CustomErrorHandler.badRequest("Icon image is required"));
    }

    const iconFile = req.files.icon;

    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];
    if (!allowedMimeTypes.includes(iconFile.mimetype)) {
      return next(CustomErrorHandler.badRequest("Invalid file type. Only JPEG, PNG, and GIF are allowed"));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(iconFile.tempFilePath, {
      folder: "food-delivery/categories/icons",
    });

    const newCategory = new Category({
      name,
      icon: cloudinaryResponse.secure_url,
      restaurant,
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return next(error);
  }
};


export const getCategoriesByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const categories = await Category.find({ restaurant: restaurantId });

    if (!categories) {
      return next(CustomErrorHandler.notFound("No categories found for this restaurant"));
    }

    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .populate("restaurant", "name logo")
      .populate("items", "name price image");

    if (!categories || categories.length === 0) {
      return next(CustomErrorHandler.notFound("No categories found"));
    }

    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return next(error);
  }
};