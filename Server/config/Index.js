import { config } from "dotenv";
config();
export const {
    APP_PORT,
    MONGO_URI,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET,
} = process.env;
