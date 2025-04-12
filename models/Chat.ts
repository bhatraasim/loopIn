import mongoose, { Schema, model, models } from "mongoose";

export interface IChat {
    isGroup:boolean;
    participants:[mongoose.Types.ObjectId]
    lastMessage:mongoose.Types.ObjectId
}

const ChatSchema = new Schema<IChat>({
    isGroup:{type: Boolean, default: false },
    participants : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
})

export default mongoose.models.Chat ||  mongoose.model<IChat>("Like", ChatSchema);