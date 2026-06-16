import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "jwt";

const PUBLIC_ONLY_ROUTES = ["/login", "/register", "/verify-email"];
const PRIVATE_ROUTES = ["/dashboard", "/workshop-register"];

export function proxy(request: NextRequest) { 
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(AUTH_COOKIE);

  if (PRIVATE_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (PUBLIC_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/workshop-register/:path*", "/login", "/register"],
};
