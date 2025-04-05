import { Router } from "express";
import {registerUser,loginUser,cheakAuth} from "../controllers/user.controller.js"
const userRouter=Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/cheakauth",cheakAuth)

export default userRouter