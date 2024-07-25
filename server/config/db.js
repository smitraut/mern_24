import mongoose from "mongoose";

const URI = process.env.MONGODB_URI

//"mongodb+srv://mern24:mern24123@mern24.vseuqhp.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=mern24";


export const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected")
    } catch (error) {
        console.log*"database connection failed"
        process.exit(0);
    }
}

