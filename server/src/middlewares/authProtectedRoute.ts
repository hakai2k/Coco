import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../utils/validateEnv";
import UserModel from "../models/User.model";

export const authProtectedRoute: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw createHttpError(404, "Unauthorized: Token not found.");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    if (!decoded) {
      throw createHttpError(400, "Unauthorizded: Invalid token.");
    }

    const user = await UserModel.findById(decoded.uid);
    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
