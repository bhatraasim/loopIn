import mongoose, { Schema, model, models } from "mongoose";

export interface IMessage {
    sender:mongoose.Schema.Types.ObjectId;
    content:string;
    chat:mongoose.Schema.Types.ObjectId;
    timestamp:Date;
}

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    timestamp: { type: Date, default: Date.now },
});

export default models.Message ||  mongoose.model<IMessage>("Like", MessageSchema);