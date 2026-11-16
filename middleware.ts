import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  // Optimistically check for the Better Auth session cookie
  const sessionCookie = getSessionCookie(request);

  // If the user doesn't have an active session, redirect them to /signin
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Define the routes that should be protected by this middleware
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};