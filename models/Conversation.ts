
import mongoose, { Schema, model, models } from "mongoose";


export interface IConversation {
    participants:mongoose.Schema.Types.ObjectId;
    message: mongoose.Schema.Types.ObjectId;
    timestamp:Date;


}

const ConversationSchema = new mongoose.Schema<IConversation>({
    participants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'  , default:[] }]
     
},{timestamps:true});

export default models.Conversation ||  mongoose.model<IConversation>("Conversation", ConversationSchema);