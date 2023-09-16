import mongoose, { trusted } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
const User = mongoose.model("User", UserSchema);
export {User};

// import mongoose, { Document, Schema } from 'mongoose'; 

// export interface UserDocument extends Document { username: string; email: string; password: string; }
// const userSchema = new Schema<UserDocument>({ 
//     username: String, 
//     email: String, 
//     password: String, 
// }); 
// export default mongoose.model<UserDocument>('User', userSchema);