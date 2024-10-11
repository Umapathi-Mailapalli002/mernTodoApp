import mongoose from "mongoose";

const DB_NAME = "todoApp"

const connectDB = async () => {
    try {
        const connectionInstence = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongoDB is connected successfully and hosted at: ${connectionInstence.connection.host}`);
    } catch (error) {
        console.log("faild on connecting mongoDB");
        process.exit(1);
    }
};

export default connectDB;