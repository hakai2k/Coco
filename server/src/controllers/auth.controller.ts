import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";
import { genToken } from "../utils/genToken";

export const me: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface IF_SignupBody {
  username?: string;
  email?: string;
  password?: string;
}
export const signup: RequestHandler<
  unknown,
  unknown,
  IF_SignupBody,
  unknown
> = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw createHttpError(400, "Enter all credentials to signup.");
    }

    const emailRegEx: RegExp =
      /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
    if (!emailRegEx.test(email)) {
      throw createHttpError(400, "Enter a valid email.");
    }

    const isUserNameTaken = await UserModel.findOne({ username });
    if (isUserNameTaken) {
      throw createHttpError(
        400,
        "A user with this username already exists. Choose a different username or login instead."
      );
    }

    const isEmailExisting = await UserModel.findOne({ email });
    if (isEmailExisting) {
      throw createHttpError(
        400,
        "A user with this email already exists. Enter a different username or login instead."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });
    if (!user) {
      throw createHttpError(400, "There was an error while creating the user.");
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

interface IF_LoginBody {
  username?: string;
  password?: string;
}
export const login: RequestHandler<
  unknown,
  unknown,
  IF_LoginBody,
  unknown
> = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw createHttpError(400, "Enter valid login credentials");
    }

    const user = await UserModel.findOne({ username }).select("+password");
    if (!user) {
      throw createHttpError(404, "Enter valid login credentials");
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw createHttpError(400, "Enter valid login credentials");
    }

    genToken(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ Message: "User logged out successfully." });
  } catch (error) {
    next(error);
  }
};
