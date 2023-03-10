import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const isDeployment = Boolean(process.env.VERCEL_URL);
  const cookieName = isDeployment
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  const requestPathName = request.nextUrl.clone().pathname;
  const hasAuthCookie = request.cookies.get(cookieName);

  if (requestPathName === "/") {
    if (hasAuthCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (
    requestPathName.startsWith("/dashboard") ||
    requestPathName.startsWith("/collections") ||
    requestPathName.startsWith("/profile")
  ) {
    if (!hasAuthCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
};

// Paths that you want to match for.
// Visit https://nextjs.org/docs/advanced-features/middleware#matcher
// for more on pattern matching.
export const config = {
  matcher: [
    "/dashboard",
    "/collections/:path*",
    "/collections/:path*",
    "/profile",
    "/",
  ],
};
