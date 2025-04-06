import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import cookie from "cookie";

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies["jwt"];

  // Get the requested URL
  const url = new URL(request.url);
  const pathname = url.pathname;

  // If token is present, verify it
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
      await jwtVerify(token, secret);

      // If the user is authenticated and trying to access /signin, redirect to /dashboard using a 302
      if (pathname === "/signin") {
        return NextResponse.redirect(new URL("/dashboard", request.url), { status: 302 });
      }
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      // Token verification failed, redirect to /signin using a 302
      if (pathname !== "/signin") {
        return NextResponse.redirect(new URL("/signin", request.url), { status: 302 });
      }
    }
  } else {
    // No token present, redirect to /signin using a 302 if not already there.
    if (pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url), { status: 302 });
    }
  }

  // Allow access to /signin if no token or token verification fails
  if (pathname === "/signin") {
    return NextResponse.next();
  }

  // For all other routes, redirect to /signin using a 302 if not authenticated
  return NextResponse.redirect(new URL("/signin", request.url), { status: 302 });
}

export const config = {
  matcher: [
    "/signin",
    "/dashboard/:path*",
    "/admissions/:path*",
    "/patients/:path*",
    "/documents/:path*",
    "/administration/:path*",
    "/profile/:path*",
  ],
};
