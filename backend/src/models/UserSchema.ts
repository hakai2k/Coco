import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender:{
        type: Boolean,
        required: false
    },
    age: {
        type: Number,
        requied: false
    }
}, {timestamps: true})

type UserSchema = InferSchemaType<typeof userSchema>
export default model<UserSchema>("users", userSchema)