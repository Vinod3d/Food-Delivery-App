import express from 'express'
import { APP_PORT, MONGO_URI } from './config/Index.js';
import connectDB from './db/ConnectDB.js';
import fileUpload from 'express-fileupload';
import imageRoutes from './routes/imageRoutes.js'


const app = express();
const PORT = APP_PORT;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);


// Routes
app.get('/', (req, res) => {
    res.send('app is running')
});

app.use('/api/images', imageRoutes);

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();