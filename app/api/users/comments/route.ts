import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { videoId, text } = body;

    if (!videoId || !text) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    connectToDatabase();
    const comment = await Comment.create({
      videoId: new mongoose.Types.ObjectId(videoId),
      userId: session.user.id,
      text:text
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error posting comment:");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("Starting to fetch comments");
    const videoId = req.nextUrl.searchParams.get("videoId");
    if (!videoId) {
      return NextResponse.json({ message: "Missing videoId" }, { status: 400 });
    }

    console.log("searchParams:", req.nextUrl.searchParams.toString());
    console.log("postId:", req.nextUrl.searchParams.get("postId"));
    await connectToDatabase();

    const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:");
    return NextResponse.json(
      { message: "Error fetching comments" },
      { status: 500 }
    );
  }
}
