import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Skip system paths, API routes, the root homepage, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Force a 308 Permanent Redirect if the slash is missing
  if (!pathname.endsWith("/")) {
    const targetUrl = new URL(`${pathname}/${search}`, request.url);
    return NextResponse.redirect(targetUrl, 308);
  }

  return NextResponse.next();
}
