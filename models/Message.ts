
import mongoose, { Schema, model, models } from "mongoose";

export interface IMessage {
    sender:mongoose.Schema.Types.ObjectId;
    reciver:mongoose.Schema.Types.ObjectId;
    content:string;
    chat:mongoose.Schema.Types.ObjectId;
    timestamp:Date;
}

const MessageSchema = new mongoose.Schema<IMessage> ({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reciver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type:String , kMaxLength:200 },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    timestamp: { type: Date, default: Date.now },
});

export default models.Message ||  mongoose.model<IMessage>("Message", MessageSchema);