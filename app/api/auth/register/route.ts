import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Token from "@/models/Token";
import { sendEmail } from "@/lib/nodemailer";
import crypto from "crypto"

export async function POST(request:NextRequest){


    try {
        const { email , password } = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                {error:"Email and password are requried"},
                {status:400}
            )
        }
        await connectToDatabase()
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return NextResponse.json(
                {error:"User already exists "},
                {status:400}
            )
        }

        const user = await User.create({
            email,
            password,
            
        })

        const token = await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString('hex')

        }).save()

        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        console.log("Generated verification URL:", url);
        await sendEmail(user.email , "VERIFY EMAIL " , url)



        return NextResponse.json(
            {message:"Email is send to you account please verify "},
            {status:201}
        )

    } catch (error) {
        return NextResponse.json(
            {error:"Failed to create user "},
            {status:500}
        )
    }
}