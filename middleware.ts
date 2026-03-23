import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ['/login','/register'];
const PROTECTED_ROUTES = ['/dashboard','/home₹'];

export function middleware(req: NextRequest) {
    const { pathname,search } = req.nextUrl;

    const session = req.cookies.get('session')?.value;
    const isLoggedIn = Boolean(session);

    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    if (!isLoggedIn && isProtectedRoute) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('redirect', pathname + search);
        return NextResponse.redirect(loginUrl);
    }
    
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*','/home/:path*','/login','/register']
}