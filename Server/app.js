import express from 'express'
import { APP_PORT, MONGO_URI } from './config/Index.js';
import connectDB from './db/ConnectDB.js';


const app = express();
const PORT = APP_PORT;

app.get('/', (req, res) => {
    res.send('app is running')
});

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();