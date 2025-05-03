import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos);
  } catch (error:unknown) {
    return NextResponse.json(
      { error: error || "failed to fetch videos " },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) { 
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "unauthorized access" },
        { status: 401 }
      );
    }
    await connectToDatabase();
    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.thumbnailUrl ||
      !body.videoUrl
    ) {
      return NextResponse.json(
        { error: " Missing requried feilds" },
        { status: 401 }
      );
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);



    return NextResponse.json(newVideo);
  } catch (error:unknown) {
    return NextResponse.json(
      { error: error || "failed to create videos " },
      { status: 200 }
    );
  }
}
