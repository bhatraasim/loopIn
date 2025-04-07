import { connectToDatabase } from "@/lib/db";
import Token from "@/models/Token";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest , { params }: { params : { userId:string , token:string}}){
    try {
        await connectToDatabase()
        const user = await User.findOne({_id:params.userId})

        if(!user){
            return NextResponse.json({message:"Invalid Link - User not found"}, { status: 400 });
        }

        if (user.verified) {
            return NextResponse.json({ message: "Email already verified!" }, { status: 200 });
        }

        const token = await Token.findOne({
            userId:user._id,
            token : params.token
        })
        if(!token){
            return NextResponse.json({message:"Invalid or expired Link"}, { status: 400 });
        }

        await User.updateOne(
            { _id: user._id },
            { $set: { verified: true } }
          );

        await Token.deleteOne({ _id: token._id });
        return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ message: "Something went wrong during verification" }, { status: 500 });
    }
}