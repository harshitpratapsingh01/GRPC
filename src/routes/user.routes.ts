import express from "express";
import { User } from "../controller/user.controller";

export const userRoutes = express.Router();

userRoutes.post('/Register', User.registerUser);
userRoutes.get("/getUserDetails", User.getUserDetails);
userRoutes.post("/login", User.loginUser);


