import express from "express";
import {
  register,
  login,
  getAllUsers,
  getMe,
} from "../controllers/UserController";
import { authMiddleware } from "../controllers/Authmiddlewaret";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/all", getAllUsers);
userRouter.get("/me", authMiddleware, getMe);
export default userRouter;
