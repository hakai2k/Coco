import { InferSchemaType, Schema, model } from "mongoose";

type UserType = {
  _id: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  password: string;
  type: string;
  saved: Schema.Types.ObjectId[];
};

const UserSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 16,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
        "Enter a valid email.",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
    type: {
      type: String,
      enum: ["common", "admin", "mod"],
      required: true,
      default: "common",
    },
    saved: [
      {
        type: Schema.Types.ObjectId,
        ref: "anime",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

type UserModel = InferSchemaType<typeof UserSchema>;
export default model<UserModel>("user", UserSchema);
