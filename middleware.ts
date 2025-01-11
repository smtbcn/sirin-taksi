/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Admin sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Login sayfasını kontrol etme
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Admin cookie'sini kontrol et
    const adminAuth = request.cookies.get("admin_auth");

    if (!adminAuth || adminAuth.value !== "true") {
      // Giriş yapılmamış, login sayfasına yönlendir
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
