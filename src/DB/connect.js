import mongoose from "mongoose";




const connectDB = async () => {
    try {

        const url = process.env.MONGODB_URI

        mongoose.connect(url)
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("connected");
        });

        connection.on("error", () => {
            console.log("connection failed ");
        });

    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB