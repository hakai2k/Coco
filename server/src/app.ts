import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import authRouter from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  throw createHttpError(404, "Endpoint not found.");
});
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  let message = "An error has occurred. Internal server error.";
  let status = 500;
  if (isHttpError(err)) {
    message = err.message;
    status = err.status;
  }
  res.status(status).json({ message });
});
export default app;
