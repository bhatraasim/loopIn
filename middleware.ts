import withAuth from "next-auth/middleware";
import { matchesMiddleware } from "next/dist/shared/lib/router/router";
import { NextResponse } from "next/server";
import path from "path";


export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized :({token,req})=>{
                const {pathname} = req.nextUrl
                //allow  auth related routes 
                if (
                    pathname.startsWith("/api/auth") || 
                    pathname === "/login" || 
                    pathname === "/register"
                ) {
                    return true 
                }

                // //public routes
                // if (
                //     pathname === "/" || 
                //     pathname.startsWith("/api/videos") ||
                //     pathname.startsWith("/api/users")
                // ) {
                //     return true;
                // }

                return !!token
            }

        }
    }
)

export const config ={
    matcher : ["/((?!_next/static|_next/image|favicon.ico|public/).*)"]
}