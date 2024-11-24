import { config } from "dotenv";
config();
export const {
    APP_PORT,
    MONGO_URI,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET,
    DEBUG_MODE,
    JWT_KEY,
    JWT_EXPIRES,
    COOKIE_EXPIRES,
    FRONTEND_URL
} = process.env;
