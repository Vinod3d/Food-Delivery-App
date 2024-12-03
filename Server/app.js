import express from 'express'
import { APP_PORT, JWT_KEY, MONGO_URI, FRONTEND_URL } from './config/Index.js';
import connectDB from './db/ConnectDB.js';
import fileUpload from 'express-fileupload';
import imageRoutes from './routes/imageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import payCardRoutes from "./routes/payCardRoutes.js";
import errorHandler from './middleware/errorHandlers.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = APP_PORT;


//Middleware
app.use(cors({
    origin: FRONTEND_URL || 'https://food-delivery-p339k2qix-vinod3ds-projects.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser(JWT_KEY));
app.use(express.urlencoded({extended: true}));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);



// API Routes

app.use('/api/images', imageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/paycards", payCardRoutes);
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Health Check Route
app.get('/check', (req, res) => {
    res.send('app is running');
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();