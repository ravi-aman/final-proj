import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
