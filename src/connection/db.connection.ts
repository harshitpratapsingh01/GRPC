import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const dbConnection = async ()=> {
    try {
        await mongoose.connect("mongodb://localhost:27017/GRPC");
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);

    };
}

export { dbConnection };