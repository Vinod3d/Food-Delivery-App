import Joi from "joi";
import cloudinary from "../config/cloudinaryConfig.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import User from "../models/userSchema.js";
import { JwtService } from "../services/JwtService.js";

export const register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
  });

  const { error } = schema.validate({ name, email, password, phone });

  if (error) {
    return next(CustomErrorHandler.validationError(error.details[0].message));
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(
        CustomErrorHandler.alreadyExist("Email is already registered")
      );
    }

    const newUser = new User({ name, email, password, phone });
    await newUser.save();

    res.status(201).json({
      newUser,
      message: "User created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return next(CustomErrorHandler.validationError(error.details[0].message));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials("Invalid email."));
    }
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return next(CustomErrorHandler.unAuthorized("Invalid password."));
    }

    JwtService(user, "User Logged in Successfully", 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "logged out",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return next(CustomErrorHandler.badRequest('No users found'));
    }

    return res.status(200).json(users);
  } catch (error) {
    return next(error)
  }
};


export const getUser = async (req, res, next) => {
  const  id  = req.user._id;

  try {
    const user = await User.findById(id)
      .populate('addresses')
      // .populate('payment_cards');

    if (!user) {
      return next(CustomErrorHandler.notFound('user not found'));
    }

    return res.status(200).json({user});
  } catch (error) {
    return next(error);
  }
};


export const updateUserProfile = async (req, res, next)=>{
  try {
    const userId = req.user._id;
    const { name, email, gender, country, phone } = req.body;

    let profileImage;
    if (req.files && req.files.profile_image) {
      const imageFile = req.files.profile_image;
      
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
      if (!allowedMimeTypes.includes(imageFile.mimetype)) {
        return next(CustomErrorHandler.badRequest("Invalid file type. Only JPEG, PNG, and GIF are allowed"));
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: "profile-images",
      });

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(CustomErrorHandler.badRequest("Cloudinary Error: " + (cloudinaryResponse.error || "Unknown error")));
      }

      profileImage = cloudinaryResponse.secure_url;
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (gender) updateFields.gender = gender;
    if (country) updateFields.country = country;
    if (profileImage) updateFields.profile_image = profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(CustomErrorHandler.badRequest("User not found"));
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    return next(error);
  }
}