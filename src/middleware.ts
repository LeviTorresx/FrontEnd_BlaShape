import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const AUTH_COOKIE = "jwt";

const PUBLIC_ONLY_ROUTES = ["/login", "/register"];
const PRIVATE_ROUTES = ["/dashboard", "/workshop-register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(AUTH_COOKIE);

  // Unauthenticated user → redirect to login
  if (PRIVATE_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Authenticated user → redirect to dashboard
  if (PUBLIC_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workshop-register/:path*",
    "/login",
    "/register",
  ],
};
