import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Like from "@/models/Like";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest  ){
    const session = await getServerSession(authOptions)

    const userId = session?.user.id
    await connectToDatabase()
    const {videoId } = await req.json();
    if (!videoId || !userId) {
        return NextResponse.json({ error: "videoId and userId required" }, { status: 400 });
    }

    try {
        const existingLike = await Like.findOne({videoId , userId})

        if (existingLike) {
            //Unlike : remove like doc and decremnrt the like count 

            await Like.deleteOne({_id:existingLike._id})
            await Video.updateOne({_id : videoId} , {$inc:{like:-1}})
            const updatedVideo = await Video.findById(videoId);
            return NextResponse.json({ liked: false, likeCount: updatedVideo?.like || 0 });
        }else{
            //Like : create like doc and inc the count 
            await Like.create({videoId , userId})
            await Video.updateOne({_id : videoId}  ,{$inc:{like:+1}})
            const updatedVideo = await Video.findById(videoId)
            return NextResponse.json({ liked: true, likeCount: updatedVideo?.like || 0 });
        }

    } catch (error:unknown) {
        console.error(error);
    return NextResponse.json({ error :"Something went wrong" }, { status: 500 });
    }


}