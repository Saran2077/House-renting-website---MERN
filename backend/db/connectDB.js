import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb is connected")
    } catch (error) {
        console.log(`Erroe in connectDB: ${error.message}`)
        process.exit(1)
    }
};

export default connectDB;