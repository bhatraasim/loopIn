// models/Comment.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  videoId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
