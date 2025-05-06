import mongoose from "mongoose";

export const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Database connected")
    } catch (error) {
        console.log*"database connection failed"
        process.exit(0);
    }
}

  