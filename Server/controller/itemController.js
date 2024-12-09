import Item from "../models/itemSchema.js";
import cloudinary from "../config/cloudinaryConfig.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

export const createItem = async (req, res, next) => {
  try {
    const { name, description, price, category, restaurant } = req.body;

    if (!name || !description || !price || !category || !restaurant) {
      return next(CustomErrorHandler.badRequest("All fields are required"));
    }

    if (isNaN(price) || price <= 0) {
      return next(CustomErrorHandler.badRequest("Invalid price value"));
    }

    if (!req.files || !req.files.image) {
      return next(CustomErrorHandler.badRequest("Image file is required"));
    }

    const imageFile = req.files.image;

    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];
    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return next(CustomErrorHandler.badRequest("Invalid file type. Only JPEG, PNG, GIF, and SVG are allowed"));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: "food-delivery/items",
    });

    const newItem = new Item({
      name,
      description,
      price,
      image: cloudinaryResponse.secure_url,
      category,
      restaurant,
    });

    await newItem.save();

    res.status(201).json({
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    return next(error);
  }
};


export const getItemsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const items = await Item.find({ category: categoryId }).populate("category restaurant");

    if (!items.length) {
      return next(CustomErrorHandler.notFound("No items found for this category"));
    }

    res.status(200).json({
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    return next(error);
  }
};


export const getItemsByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const items = await Item.find({ restaurant: restaurantId }).populate("category restaurant");

    if (!items.length) {
      return next(CustomErrorHandler.notFound("No items found for this restaurant"));
    }

    res.status(200).json({
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllItems = async (req, res, next) => {
    try {
      const items = await Item.find()
        .populate("category", "name icon")
        .populate("restaurant", "name logo");
  
      if (!items || items.length === 0) {
        return next(CustomErrorHandler.notFound("No items found"));
      }
  
      res.status(200).json({
        message: "Items fetched successfully",
        data: items,
      });
    } catch (error) {
      return next(error);
    }
};


export const searchItems = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return next(CustomErrorHandler.badRequest("Search query is required"));
    }

    const items = await Item.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ]
    });

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found matching your query" });
    }

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
