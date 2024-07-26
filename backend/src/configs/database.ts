import mongoose from "mongoose";
import * as dotenv from 'dotenv';
//init dotenv
dotenv.config()


// Database connection function
export const databaseConnection = async () => {
    const DATABASE_URL = process.env.DATABASE_URL || ''
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Database connected successfully");
    } catch (error: any) {
        console.error("Error connecting to DB:", error.message);
    }
};


export default databaseConnection;
