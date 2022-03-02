import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    // @ts-ignore
    const token = await getToken({req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    if (token || pathname.includes('/api/auth') ||  pathname === '/login') {
        return NextResponse.next();
    }

    return NextResponse.redirect(`http://localhost:3000/login`);
}
