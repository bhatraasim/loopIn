import ImageKit from "imagekit"
import { NextResponse } from "next/server";



export async function GET() {

    if (!process.env.NEXT_PUBLIC_PUBLIC_KEY || !process.env.PRIVATE_KEY || !process.env.NEXT_PUBLIC_URL_ENDPOINT) {
        return NextResponse.json(
            { error: "Missing ImageKit credentials" },
            { status: 500 }
        );
    }

    const imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY  || "",
        privateKey: process.env.PRIVATE_KEY || "",
        urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT || "",
      });

    try {
        const authenticationParameters= imagekit.getAuthenticationParameters()
        return NextResponse.json(authenticationParameters);
        
    } catch (error:unknown) {
        return NextResponse.json(
            {error:error ||"Imagekit Auth failed "},
            {status:500}
        )
    }
}
