import express from "express";
import * as authController from "../controllers/auth.controller";
import { authProtectedRoute } from "../middlewares/authProtectedRoute";

const authRouter = express.Router();

authRouter.get("/me", authProtectedRoute, authController.me);
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
