import { InferSchemaType, Schema, model } from "mongoose";

type AnimeType = {
  _id: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  format: string;
  romanji: string;
  english: string;
  episode_count: number;
  relations: Schema.Types.ObjectId[];
  year: number;
  status: string;
  genres: string[];
  tag: string;
};

const AnimeSchema = new Schema<AnimeType>(
  {
    romanji: {
      type: String,
      required: true,
    },
    english: {
      type: String,
      required: true,
    },
    episode_count: {
      type: Number,
      required: true,
    },
    relations: [
      {
        type: Schema.Types.ObjectId,
        ref: "anime",
      },
    ],
    format: {
      type: String,
      enum: ["tv", "movie", "ona", "ova", "special"],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["airing", "completed", "hiatus", "upcoming", "cancelled"],
      required: true,
    },
    genres: [
      {
        type: String,
        required: true,
      },
    ],
    tag: {
      type: String,
      enum: ["top-airing", "most-popular", "featured", "most-favorite"],
    },
  },
  { timestamps: true }
);

type AnimeModel = InferSchemaType<typeof AnimeSchema>;
export default model<AnimeModel>("anime", AnimeSchema);
