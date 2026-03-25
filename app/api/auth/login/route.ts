import { NextResponse } from "next/server";
import { generateJWTToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
    const body = await req.json();
    const { userId, password } = body;

    if (!userId || !password) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const sessionToken = generateJWTToken(userId, password);

    const res = NextResponse.json({ ok: true });

    res.cookies.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
}