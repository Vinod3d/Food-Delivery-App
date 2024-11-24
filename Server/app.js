import express from 'express'
import { APP_PORT, JWT_KEY, MONGO_URI, FRONTEND_URL } from './config/Index.js';
import connectDB from './db/ConnectDB.js';
import fileUpload from 'express-fileupload';
import imageRoutes from './routes/imageRoutes.js'
import userRoutes from './routes/userRoutes.js'
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
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors({
    origin: FRONTEND_URL,
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


// Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.get('/', (req, res) => {
    res.send('app is running')
});

app.use('/api/images', imageRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler);

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();