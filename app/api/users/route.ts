import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find({}).select('-password').lean();
        
        if (!users || users.length === 0) {
            return NextResponse.json([], { status: 200 });
        }
        
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching Users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}