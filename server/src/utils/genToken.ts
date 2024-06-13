import { Response } from "express";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import env from "./validateEnv";

export const genToken = (uid: Schema.Types.ObjectId, res: Response) => {
  const token = jwt.sign({ uid }, env.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV !== "development",
  });
};
