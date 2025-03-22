import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
        }
        return NextResponse.json(videos)
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        console.log("Database connected successfully");

        let body: IVideo;
        try {
            body = await request.json();
            console.log("Received video data:", body);
        } catch (jsonError) {
            console.error("Failed to parse request body:", jsonError);
            return NextResponse.json(
                { error: "Invalid JSON format" },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            console.error("Missing required fields:", body);
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create new video with default values
        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            },
        };

        try {
            const newVideo = await Video.create(videoData);
            console.log("Video saved successfully:", newVideo);
            return NextResponse.json(newVideo, { status: 201 });
        } catch (dbError: any) {
            console.error("Database error while creating video:", dbError);
            return NextResponse.json(
                { error: `Database error: ${dbError.message}` },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error("Error in video creation process:", error);
        return NextResponse.json(
            { error: `Server error: ${error.message}` },
            { status: 500 }
        );
    }
}


