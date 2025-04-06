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

      // If the user is authenticated and trying to access /signin, redirect to /dashboard
      if (pathname === "/signin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      // Token verification failed, redirect to signin
      if (pathname !== "/signin") {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    }
  } else {
    // No token present
    if (pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Allow access to /signin if no token or if the token verification fails
  if (pathname === "/signin") {
    return NextResponse.next();
  }

  // For all other routes, redirect to signin if not authenticated
  return NextResponse.redirect(new URL("/signin", request.url));
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
