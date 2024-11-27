import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";


export const uploadImage = async (req, res, next)=>{
    try {
        const {name} = req.body;

        if (!name || typeof name !== "string" || name.trim() === "") {
            return next(CustomErrorHandler.badRequest("Invalid or missing 'name' field"));
        }

        if(!req.files || !req.files.image){
            return next(CustomErrorHandler.badRequest("No file uploaded"))
        }

        const imageFile = req.files.image;

        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
        if (!allowedMimeTypes.includes(imageFile.mimetype)) {
          return next(CustomErrorHandler.badRequest("Invalid file type. Only JPEG, PNG, and GIF are allowed"));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            folder: "food-delivery"
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              CustomErrorHandler.badRequest(
                "Cloudinary Error:",
                cloudinaryResponse.error || "Unknown Cloudinary Error"
              )
            );
        }

        const newImage = new Image(
            {
                name,
                imageUrl : {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url
                }
            }
        )

        await newImage.save();
        res.status(201).json({message: "Image uploaded successfully", data: newImage});
    } catch (error) {
        return next(error);
    }
}

export const getImages = async (req, res, next)=>{
    let images;
    try {
        const { name } = req.query;
        if (name) {
            images = await Image.find({name});
        } else {
            images = await Image.find();
        }

        if (images.length === 0) {
            return next(CustomErrorHandler.notFound('No images found'))
        }
        res.status(200).json({
            success: true,
            data: images,
          });
    } catch (error) {
        next(error);
    }
}