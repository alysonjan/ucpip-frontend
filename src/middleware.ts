import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import cookie from "cookie";

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies["jwt"];

  // Get the requested URL and pathname
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Function to create a custom redirect response with status 302
  const customRedirect = (destination: string) => {
    return new NextResponse(null, {
      status: 302,
      headers: { Location: destination },
    });
  };

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
      await jwtVerify(token, secret);

      // If authenticated and trying to access /signin, redirect to /dashboard
      if (pathname === "/signin") {
        return customRedirect("/dashboard");
      }
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      // Token verification failed: if not on /signin, redirect to /signin
      if (pathname !== "/signin") {
        return customRedirect("/signin");
      }
    }
  } else {
    // No token present: if not on /signin, redirect to /signin
    if (pathname !== "/signin") {
      return customRedirect("/signin");
    }
  }

  // Otherwise, continue as normal
  return NextResponse.next();
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
