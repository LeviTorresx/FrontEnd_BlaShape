import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "jwt";

const PUBLIC_ONLY_ROUTES = ["/login", "/register", "/verify-email"];
const PRIVATE_ROUTES = ["/dashboard", "/workshop-register"];

export function middleware(request: NextRequest) { 
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(AUTH_COOKIE);

  // Usuario no autenticado → a login
  if (PRIVATE_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Usuario autenticado → al dashboard
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
