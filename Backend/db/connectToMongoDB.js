import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(`Error while connecting to the database - ${error}`);
    }
}

export default connectToMongoDB;