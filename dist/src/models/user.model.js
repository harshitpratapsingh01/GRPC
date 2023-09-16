"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
// import mongoose, { Document, Schema } from 'mongoose'; 
// export interface UserDocument extends Document { username: string; email: string; password: string; }
// const userSchema = new Schema<UserDocument>({ 
//     username: String, 
//     email: String, 
//     password: String, 
// }); 
// export default mongoose.model<UserDocument>('User', userSchema);
//# sourceMappingURL=user.model.js.map