import { config } from "dotenv";
config();
export const {
    APP_PORT,
    MONGO_URI
} = process.env;