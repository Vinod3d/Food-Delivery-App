import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import User from "../models/userSchema.js";
import { JwtService } from "../services/JwtService.js";

export const register = async (req, res, next) =>{
    const { name, email, password, phone } = req.body;

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    })

    const {error} = schema.validate({name, email, password, phone});
 
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
        return next(error)
    }
}

export const login = async (req, res, next) =>{
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
        next(error)
    }
}

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