// models/Comment.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ILike extends Document {
  videoId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const LikeSchema = new Schema<ILike>(
  {
    videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent duplicate likes
LikeSchema.index({ videoId: 1, userId: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model<ILike>("Like", LikeSchema);
