import 'dotenv/config'
import express from 'express';
import cors from "cors";
import authRoute from './routes/auth-route.js';
import contactRoute from './routes/contact-route.js';
import serviceRoute from './routes/service-route.js';
import adminRoute from './routes/admin-route.js';
import { connectDb } from './config/db.js';
import errorMiddleware from './middlewares/error-middleware.js';


const app = express();
const PORT = 3000;

//cors middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions)); 

//middleware to use json via postman
app.use(express.json());

//main route
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute); 
app.use("/api/data", serviceRoute);

//admin route
app.use("/api/admin", adminRoute);

//middleware for error
app.use(errorMiddleware);


connectDb(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
    
})
